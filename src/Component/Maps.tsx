"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MapPin, Navigation, Phone, Mail, Globe, Route, Loader2, X, Car, Bike, PersonStanding } from "lucide-react";
import { geocodeAddress, reverseGeocode, type Coordinates } from "../../utils/nominatim";

// Interface untuk mode transportasi
interface TransportMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  speed: number; // kecepatan dalam km/h untuk kalkulasi waktu
  color: string;
}

// Interface untuk informasi rute hasil algoritma
interface RouteInfo {
  distance: number; // jarak rute dalam km
  duration: number; // estimasi waktu dalam menit
  instructions: string[];
  transportMode: TransportMode;
}

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  lat?: number;
  lng?: number;
}

const Maps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // State untuk mengelola peta dan routing
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [geocoding, setGeocoding] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null); // lokasi asal user
  const [companyCoords, setCompanyCoords] = useState<Coordinates | null>(null); // lokasi tujuan perusahaan
  const [routeControl, setRouteControl] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null); // hasil perhitungan rute
  const [showRoute, setShowRoute] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [selectedTransportMode, setSelectedTransportMode] = useState<TransportMode | null>(null); // mode yang dipilih user
  const [baseRouteData, setBaseRouteData] = useState<any>(null); // data rute untuk kalkulasi ulang

  // Daftar mode transportasi dengan kecepatan masing-masing
  const transportModes: TransportMode[] = [
    {
      id: "car",
      name: "Mobil",
      icon: <Car className="w-4 h-4" />,
      speed: 45, // 45 km/h
      color: "#3b82f6",
    },
    {
      id: "motorcycle",
      name: "Motor",
      icon: <Bike className="w-4 h-4" />,
      speed: 35, // 35 km/h
      color: "#f59e0b",
    },
    {
      id: "bicycle",
      name: "Sepeda",
      icon: <Bike className="w-4 h-4" />,
      speed: 18, // 18 km/h
      color: "#10b981",
    },
    {
      id: "walking",
      name: "Jalan Kaki",
      icon: <PersonStanding className="w-4 h-4" />,
      speed: 5, // 5 km/h
      color: "#8b5cf6",
    },
  ];

  // Data perusahaan tujuan
  const companyData: CompanyData = {
    name: "PT. Mutiara Laboratorium Mandiri",
    address: "Jalan malahayati, RT.01/RW.01, Kelurahan Air mawar, Kec. Bukitintan, Kota Pangkal Pinang, Kepulauan Bangka Belitung, 50861",
    phone: "+62 821 8167 4914",
    email: "mlm.bangka@gmail.com",
    website: "www.ptmlm.lab",
    description: "Laboratorium pengujian pengelolaan lingkungan hidup",
  };

  // Inisialisasi awal
  useEffect(() => {
    setIsMounted(true);
    setSelectedTransportMode(transportModes[0]); // default pilih mobil
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Load library Leaflet untuk peta
  useEffect(() => {
    if (!isMounted) return;

    let cancelled = false;

    const loadScripts = async () => {
      try {
        await loadLeafletWithRouting();
        if (!cancelled && isMounted) {
          setScriptsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load scripts:", error);
        if (!cancelled && isMounted) {
          setScriptsLoaded(true);
        }
      }
    };

    if (!(window as any).L || !(window as any).L.Routing) {
      loadScripts();
    } else {
      setScriptsLoaded(true);
    }

    return () => {
      cancelled = true;
    };
  }, [isMounted]);

  // Geocoding alamat perusahaan ke koordinat
  useEffect(() => {
    if (!isMounted || !scriptsLoaded) return;

    let cancelled = false;

    const initializeCompanyLocation = async () => {
      if (cancelled) return;

      setGeocoding(true);

      try {
        // Mencoba geocoding alamat perusahaan
        const coords = await geocodeAddress(companyData.address, {
          limit: 1,
          countryCode: "id",
          addressDetails: true,
        });

        if (cancelled) return;

        if (coords) {
          setCompanyCoords(coords);
        } else {
          // Fallback ke koordinat hardcode jika gagal
          setCompanyCoords({
            lat: -2.1099649450814106,
            lng: 106.1406938227614,
            display_name: companyData.address,
          });
        }
      } catch (error) {
        if (cancelled) return;
        // Fallback ke koordinat hardcode
        setCompanyCoords({
          lat: -2.1099649450814106,
          lng: 106.1406938227614,
          display_name: companyData.address,
        });
      } finally {
        if (!cancelled && isMounted) {
          setGeocoding(false);
        }
      }
    };

    const timer = setTimeout(() => {
      if (!cancelled && isMounted) {
        initializeCompanyLocation();
      }
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, isMounted, scriptsLoaded]);

  // Inisialisasi peta Leaflet
  useEffect(() => {
    if (!companyCoords || !isMounted || !scriptsLoaded) return;

    let mapInstance: any = null;
    let initializationTimeout: NodeJS.Timeout;

    const initMap = () => {
      if (!mapRef.current || !isMounted) return;

      try {
        if (mapInstance) {
          mapInstance.remove();
        }

        // Buat instance peta baru
        mapInstance = (window as any).L.map(mapRef.current, {
          center: [companyCoords.lat, companyCoords.lng],
          zoom: 15,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
        });

        // Tambahkan tile layer OpenStreetMap
        (window as any).L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(mapInstance);

        // Tambahkan marker perusahaan
        addCompanyMarker(mapInstance, companyCoords);

        if (isMounted) {
          setMap(mapInstance);
          setLoading(false);
        }
      } catch (error) {
        console.error("Map initialization error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializationTimeout = setTimeout(() => {
      if (isMounted && (window as any).L) {
        initMap();
      }
    }, 200);

    return () => {
      clearTimeout(initializationTimeout);
      if (mapInstance) {
        try {
          if (routeControl) {
            mapInstance.removeControl(routeControl);
          }
          mapInstance.remove();
        } catch (error) {
          console.error("Map cleanup error:", error);
        }
      }
    };
  }, [companyCoords, isMounted, scriptsLoaded]);

  // Load Leaflet dan routing library
  const loadLeafletWithRouting = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if ((window as any).L && (window as any).L.Routing) {
          resolve();
          return;
        }

        const existingLeafletCSS = document.querySelector('link[href*="leaflet.css"]');
        const existingRoutingCSS = document.querySelector('link[href*="leaflet-routing-machine.css"]');

        if (!existingLeafletCSS) {
          const leafletCSS = document.createElement("link");
          leafletCSS.rel = "stylesheet";
          leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          leafletCSS.crossOrigin = "";
          document.head.appendChild(leafletCSS);
        }

        if (!existingRoutingCSS) {
          const routingCSS = document.createElement("link");
          routingCSS.rel = "stylesheet";
          routingCSS.href = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css";
          routingCSS.crossOrigin = "";
          document.head.appendChild(routingCSS);
        }

        const existingLeafletJS = document.querySelector('script[src*="leaflet.js"]');
        if (!existingLeafletJS && !(window as any).L) {
          const leafletJS = document.createElement("script");
          leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          leafletJS.crossOrigin = "";

          leafletJS.onload = () => {
            const existingRoutingJS = document.querySelector('script[src*="leaflet-routing-machine.js"]');
            if (!existingRoutingJS && !(window as any).L?.Routing) {
              const routingJS = document.createElement("script");
              routingJS.src = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js";
              routingJS.crossOrigin = "";

              routingJS.onload = () => {
                setTimeout(resolve, 100);
              };
              routingJS.onerror = () => reject(new Error("Failed to load routing script"));
              document.head.appendChild(routingJS);
            } else {
              setTimeout(resolve, 100);
            }
          };

          leafletJS.onerror = () => reject(new Error("Failed to load leaflet script"));
          document.head.appendChild(leafletJS);
        } else if ((window as any).L) {
          if (!(window as any).L.Routing) {
            const routingJS = document.createElement("script");
            routingJS.src = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js";
            routingJS.crossOrigin = "";
            routingJS.onload = () => setTimeout(resolve, 100);
            routingJS.onerror = () => reject(new Error("Failed to load routing script"));
            document.head.appendChild(routingJS);
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  // ALGORITMA GREEDY: Fungsi untuk menghitung waktu tempuh
  // Formula: waktu = jarak / kecepatan
  // Ini adalah bagian greedy choice untuk optimasi waktu
  const calculateTravelTime = (distanceKm: number, mode: TransportMode): number => {
    return Math.round((distanceKm / mode.speed) * 60);
  };

  // ALGORITMA GREEDY: Update mode transportasi dan kalkulasi ulang
  // Ini menerapkan greedy choice untuk memilih opsi terbaik
  const updateTransportMode = (newMode: TransportMode) => {
    setSelectedTransportMode(newMode);

    if (baseRouteData && routeInfo) {
      // Kalkulasi ulang waktu dengan mode baru (greedy recalculation)
      const newDuration = calculateTravelTime(baseRouteData.distance, newMode);

      setRouteInfo({
        distance: baseRouteData.distance,
        duration: newDuration,
        instructions: baseRouteData.instructions,
        transportMode: newMode,
      });

      // Update visualisasi rute dengan warna mode baru
      if (routeControl && map) {
        try {
          map.removeControl(routeControl);

          const newRouteControl = (window as any).L.Routing.control({
            waypoints: [(window as any).L.latLng(userLocation!.lat, userLocation!.lng), (window as any).L.latLng(companyCoords!.lat, companyCoords!.lng)],
            routeWhileDragging: false,
            addWaypoints: false,
            createMarker: function () {
              return null;
            },
            lineOptions: {
              styles: [
                {
                  color: newMode.color,
                  weight: 6,
                  opacity: 0.8,
                },
              ],
            },
            show: false,
            collapsible: false,
          });

          newRouteControl.addTo(map);
          setRouteControl(newRouteControl);
        } catch (error) {
          console.error("Error updating route color:", error);
        }
      }

      console.log(`Mode berubah ke ${newMode.name}: ${baseRouteData.distance}km, ${newDuration} menit`);
    }
  };

  // Tambahkan marker perusahaan ke peta
  const addCompanyMarker = (mapInstance: any, coords: Coordinates) => {
    if (!mapInstance || !coords) return;

    try {
      const companyIcon = (window as any).L.divIcon({
        className: "company-marker",
        html: `
          <div style="
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: 3px solid white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            color: white;
            font-size: 20px;
          ">
            🏢
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });

      const marker = (window as any).L.marker([coords.lat, coords.lng], {
        icon: companyIcon,
      }).addTo(mapInstance);

      const isMobile = window.innerWidth < 768;
      const popupWidth = isMobile ? 240 : 280;
      const fontSize = isMobile ? 12 : 14;
      const titleSize = isMobile ? 14 : 18;

      marker
        .bindPopup(
          `
        <div style="min-width: ${popupWidth}px; font-family: system-ui; font-size: ${fontSize}px;">
          <h3 style="margin: 0 0 6px 0; color: #1f2937; font-size: ${titleSize}px; font-weight: 600; line-height: 1.2;">
            ${companyData.name}
          </h3>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: ${fontSize - 1}px; line-height: 1.3;">
            📍 ${coords.display_name}
          </p>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
            <div style="margin-bottom: 4px; color: #374151; font-size: ${fontSize - 1}px;">
              📞 ${companyData.phone}
            </div>
            <div style="margin-bottom: 4px; color: #374151; font-size: ${fontSize - 1}px;">
              ✉️ ${companyData.email}
            </div>
            <div style="color: #374151; font-size: ${fontSize - 1}px;">
              🌐 ${companyData.website}
            </div>
          </div>
        </div>
      `,
          {
            maxWidth: popupWidth + 20,
            className: "custom-popup",
          }
        )
        .openPopup();
    } catch (error) {
      console.error("Error adding company marker:", error);
    }
  };

  // Ambil lokasi user menggunakan GPS
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung geolocation");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        try {
          const userAddress = await reverseGeocode(userLat, userLng);

          const userCoords: Coordinates = {
            lat: userLat,
            lng: userLng,
            display_name: userAddress?.display_name || "Lokasi Anda",
          };

          setUserLocation(userCoords);

          if (map) {
            addUserMarker(userCoords);
            fitMapToShowBothLocations(userCoords);
          }
        } catch (error) {
          console.error("Error getting user address:", error);
          const userCoords: Coordinates = {
            lat: userLat,
            lng: userLng,
            display_name: "Lokasi Anda",
          };
          setUserLocation(userCoords);

          if (map) {
            addUserMarker(userCoords);
            fitMapToShowBothLocations(userCoords);
          }
        }

        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Tidak dapat mengakses lokasi Anda. Pastikan GPS aktif dan izinkan akses lokasi.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  // Tambahkan marker user ke peta
  const addUserMarker = (userCoords: Coordinates) => {
    if (!map || !userCoords) return;

    try {
      const userIcon = (window as any).L.divIcon({
        className: "user-marker",
        html: `
          <div style="
            background: linear-gradient(135deg, #10b981, #059669);
            border: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            color: white;
            font-size: 16px;
          ">
            📍
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const isMobile = window.innerWidth < 768;
      const popupWidth = isMobile ? 200 : 240;
      const fontSize = isMobile ? 12 : 14;

      (window as any).L.marker([userCoords.lat, userCoords.lng], { icon: userIcon }).addTo(map).bindPopup(`<div style="font-size: ${fontSize}px;">📍 ${userCoords.display_name}</div>`, {
        maxWidth: popupWidth,
        className: "custom-popup",
      });
    } catch (error) {
      console.error("Error adding user marker:", error);
    }
  };

  // ALGORITMA GREEDY: Fungsi utama untuk membuat rute tercepat
  // Menggunakan Leaflet Routing Machine yang menerapkan greedy approach
  const createRoute = async () => {
    // Validasi input (feasibility check)
    if (!map || !userLocation || !companyCoords || !selectedTransportMode) {
      alert("Lokasi Anda, perusahaan, dan mode transportasi harus tersedia untuk membuat rute");
      return;
    }

    if (!(window as any).L?.Routing) {
      alert("Routing engine belum dimuat. Silakan coba lagi.");
      return;
    }

    setRouteLoading(true);

    try {
      // Hapus rute sebelumnya jika ada
      if (routeControl) {
        map.removeControl(routeControl);
        setRouteControl(null);
      }

      // Buat rute baru menggunakan Leaflet Routing
      // Ini menggunakan algoritma routing yang memilih jalur terpendek
      const newRouteControl = (window as any).L.Routing.control({
        waypoints: [(window as any).L.latLng(userLocation.lat, userLocation.lng), (window as any).L.latLng(companyCoords.lat, companyCoords.lng)],
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: function () {
          return null;
        },
        lineOptions: {
          styles: [
            {
              color: selectedTransportMode.color,
              weight: 6,
              opacity: 0.8,
            },
          ],
        },
        show: false,
        collapsible: false,
      });

      // Handler ketika rute ditemukan
      newRouteControl.on("routesfound", function (e: any) {
        try {
          const routes = e.routes;
          const route = routes[0]; // Ambil rute pertama (biasanya yang terpendek)

          if (route) {
            // Ekstrak jarak dari hasil routing
            const distanceKm = Math.round((route.summary.totalDistance / 1000) * 10) / 10;

            // GREEDY CALCULATION: Hitung waktu berdasarkan mode transportasi
            const customTimeMin = calculateTravelTime(distanceKm, selectedTransportMode);

            // Ambil instruksi navigasi (maksimal 8 langkah)
            const instructions = route.instructions.slice(0, 8).map((inst: any, index: number) => `${index + 1}. ${inst.text}`);

            // Simpan data rute untuk kalkulasi ulang nanti
            const routeData = {
              distance: distanceKm,
              instructions: instructions,
              rawRoute: route,
            };
            setBaseRouteData(routeData);

            // Simpan hasil perhitungan
            setRouteInfo({
              distance: distanceKm,
              duration: customTimeMin,
              instructions,
              transportMode: selectedTransportMode,
            });

            setShowRoute(true);
            console.log(`Rute berhasil dibuat: ${distanceKm}km, ${customTimeMin} menit`);
          }
        } catch (error) {
          console.error("Route processing error:", error);
        }

        setRouteLoading(false);
      });

      // Handler jika routing gagal
      newRouteControl.on("routingerror", function (e: any) {
        console.error("Routing error:", e);
        alert("Gagal membuat rute. Coba lagi.");
        setRouteLoading(false);
      });

      // Tambahkan kontrol ke peta
      newRouteControl.addTo(map);
      setRouteControl(newRouteControl);
      fitMapToShowBothLocations(userLocation);
    } catch (error) {
      console.error("Route creation error:", error);
      alert("Gagal membuat rute. Coba lagi.");
      setRouteLoading(false);
    }
  };

  // Hapus rute dari peta
  const clearRoute = () => {
    try {
      if (routeControl && map) {
        map.removeControl(routeControl);
        setRouteControl(null);
      }

      setRouteInfo(null);
      setShowRoute(false);
      setBaseRouteData(null);

      console.log("Rute dihapus");
    } catch (error) {
      console.error("Error clearing routes:", error);
    }
  };

  // Sesuaikan view peta untuk menampilkan kedua lokasi
  const fitMapToShowBothLocations = (userCoords: Coordinates) => {
    if (!map || !companyCoords) return;

    try {
      const group = new (window as any).L.featureGroup([(window as any).L.marker([userCoords.lat, userCoords.lng]), (window as any).L.marker([companyCoords.lat, companyCoords.lng])]);

      map.fitBounds(group.getBounds().pad(0.1));
    } catch (error) {
      console.error("Error fitting bounds:", error);
    }
  };

  // Laman Loading
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (geocoding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Mengambil Koordinat Perusahaan</h2>
          <p className="text-gray-600">Sedang mencari lokasi: {companyData.address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl">
      {/* Header */}
      <div className=" shadow-sm border-b rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 py-4 ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
            <div className="flex items-center gap-4">
              <div>
                <img src="./ptmlm.png" className="w-12 h-12 " />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
                <p className="text-gray-600 text-sm">{companyData.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Tombol untuk ambil lokasi user */}
              <button onClick={getUserLocation} disabled={loading} className="flex items-center gap-2 bg-[#2973B2] text-white px-4 py-2 rounded-lg hover:bg-[#2973B2]/60 transition-colors disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                Lokasi Saya
              </button>

              {/* Tombol untuk buat rute (muncul setelah lokasi user didapat) */}
              {userLocation && !showRoute && (
                <button
                  onClick={createRoute}
                  disabled={routeLoading || !selectedTransportMode}
                  className="flex items-center gap-2 border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50">
                  {routeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Route className="w-4 h-4" />}
                  Buat Rute
                </button>
              )}

              {/* Tombol untuk hapus rute */}
              {showRoute && (
                <button onClick={clearRoute} className="flex items-center gap-2  border border-black text-black px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                  Hapus Rute
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pemilih mode transportasi (muncul setelah ada lokasi user) */}
            {userLocation && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Pilih Mode Transportasi</h3>
                <div className="grid grid-cols-2 gap-2">
                  {transportModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => updateTransportMode(mode)} // GREEDY CHOICE: pilih mode optimal
                      className={`p-3 rounded-lg border transition-all duration-200 ${selectedTransportMode?.id === mode.id ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-105" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}>
                      <div className="flex flex-col items-center gap-1">
                        <div style={{ color: mode.color }}>{mode.icon}</div>
                        <span className="text-xs font-medium ">{mode.name}</span>
                        <span className="text-xs text-gray-500">{mode.speed} km/h</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Informasi hasil rute (muncul setelah rute dibuat) */}
            {routeInfo && (
              <div className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-300">
                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <div style={{ color: routeInfo.transportMode.color }} className="transition-colors duration-300">
                    {routeInfo.transportMode.icon}
                  </div>
                  <span>Informasi Rute</span>
                  <span className="text-sm font-normal" style={{ color: routeInfo.transportMode.color }}>
                    ({routeInfo.transportMode.name})
                  </span>
                </h3>
                <div className="space-y-4">
                  {/* Tampilkan jarak dan waktu hasil algoritma */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-600">{routeInfo.distance}</div>
                      <div className="text-xs text-gray-600">km</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg transition-all duration-300">
                      <div className="text-2xl font-bold text-green-600 transition-all duration-300">{routeInfo.duration}</div>
                      <div className="text-xs text-gray-600">menit</div>
                    </div>
                  </div>

                  {/* Perbandingan semua mode transportasi */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Perbandingan mode transportasi:</h4>
                    {transportModes.map((mode) => {
                      const isActive = mode.id === routeInfo.transportMode.id;
                      const timeEstimate = calculateTravelTime(routeInfo.distance, mode); // GREEDY: kalkulasi untuk setiap mode

                      return (
                        <div key={mode.id} className={`flex items-center justify-between text-sm p-2 rounded transition-all duration-200 ${isActive ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
                          <div className="flex items-center gap-2">
                            <div style={{ color: mode.color }}>{mode.icon}</div>
                            <span className={isActive ? "font-medium text-blue-700" : "text-black"}>{mode.name}</span>
                          </div>
                          <span className={`transition-all duration-300 ${isActive ? "font-bold text-blue-700" : "text-gray-600"}`}>{timeEstimate} menit</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Informasi kontak perusahaan */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kontak Perusahaan</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{companyData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{companyData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{companyData.website}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span className="text-sm text-justify text-gray-600">{companyData.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Area Peta */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Lokasi & Rute Perusahaan</h2>
                {companyCoords && (
                  <div className="text-sm text-gray-600">
                    📍 {companyCoords.lat.toFixed(4)}, {companyCoords.lng.toFixed(4)}
                  </div>
                )}
              </div>

              <div className="relative">
                {/* Loading overlay */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg z-10">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
                      <p className="text-gray-600">Memuat peta...</p>
                    </div>
                  </div>
                )}

                {/* Container peta Leaflet */}
                <div ref={mapRef} className="w-full h-96 lg:h-[500px] rounded-lg border" />
              </div>

              {/* Legend dan informasi peta */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Lokasi Perusahaan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Lokasi Anda</span>
                  </div>
                  {/* Legend rute (muncul saat ada rute aktif) */}
                  {showRoute && selectedTransportMode && (
                    <div className="flex items-center gap-2 transition-all duration-300">
                      <div
                        className="w-8 h-1 rounded transition-all duration-300"
                        style={{
                          backgroundColor: selectedTransportMode.color,
                        }}></div>
                      <span className="text-gray-600">
                        Rute{" "}
                        <span style={{ color: selectedTransportMode.color }} className="font-medium">
                          {selectedTransportMode.name}
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Statistik rute aktif */}
                {routeInfo && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600 transition-all duration-300">
                      <span className="font-medium">Rute aktif:</span>
                      <span className="mx-1">{routeInfo.distance} km,</span>
                      <span className="font-bold transition-all duration-300" style={{ color: routeInfo.transportMode.color }}>
                        {routeInfo.duration} menit
                      </span>
                      <span className="mx-1">dengan</span>
                      <span className="font-medium" style={{ color: routeInfo.transportMode.color }}>
                        {routeInfo.transportMode.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
