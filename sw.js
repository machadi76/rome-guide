const CACHE = 'roma-2026-final-v4-2';
const OFFLINE_FILES = [
  "./27.html",
  "./28.html",
  "./29.html",
  "./30.html",
  "./README.txt",
  "./README_2.1.txt",
  "./README_3.0.txt",
  "./README_3.1.txt",
  "./README_3.2_PORTABLE.txt",
  "./README_3.3.txt",
  "./README_4.0_GITHUB_PAGES.txt",
  "./README_FINAL_4.1.txt",
  "./assets/app-v2.css",
  "./assets/app-v2.js",
  "./assets/app-v21.css",
  "./assets/app-v21.js",
  "./assets/app-v4.css",
  "./assets/app-v4.js",
  "./assets/full-v3.css",
  "./assets/guide-data.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/inclusion-report.json",
  "./assets/map-v4.js",
  "./assets/poi-database.json",
  "./assets/poi-schema.json",
  "./assets/poi-v31.css",
  "./assets/poi-v31.js",
  "./assets/portable-data.js",
  "./assets/practical-verification-report.json",
  "./assets/search-data.json",
  "./assets/style.css",
  "./attractions/aventine.html",
  "./attractions/bioparco.html",
  "./attractions/borghese-lake.html",
  "./attractions/capitoline-hill.html",
  "./attractions/castel-sant-angelo.html",
  "./attractions/galleria-borghese.html",
  "./attractions/palatine-hill.html",
  "./attractions/pantheon.html",
  "./attractions/piazza-del-popolo.html",
  "./attractions/piazza-navona.html",
  "./attractions/piazza-venezia.html",
  "./attractions/pincio.html",
  "./attractions/roman-forum.html",
  "./attractions/sistine-chapel.html",
  "./attractions/spanish-steps.html",
  "./attractions/st-peters-basilica.html",
  "./attractions/st-peters-square.html",
  "./attractions/trevi.html",
  "./attractions/vatican-museums.html",
  "./attractions/via-condotti.html",
  "./attractions/via-del-corso.html",
  "./attractions/villa-borghese.html",
  "./attractions/vittoriano.html",
  "./chapters/00_Πλήρης_Οδηγός_27_Ιουλίου.html",
  "./chapters/27_Ιουλίου_Στάση_1_Πλατεία_Ισπανίας.html",
  "./chapters/28.1_Εισαγωγή_Δεύτερης_Ημέρας.html",
  "./chapters/28.2_Πλατεία_Βενετίας_Piazza_Venezia.html",
  "./chapters/28.2a_Πλατεία_Βενετίας_Επέκταση.html",
  "./chapters/28.3_Vittoriano_Altare_della_Patria.html",
  "./chapters/29.1_Καπιτωλίνο_Μέρος_1.html",
  "./chapters/29.2_Piazza_del_Campidoglio.html",
  "./chapters/29.3_Βεράντα_Καπιτωλίου_Θέα_Ρωμαϊκής_Αγοράς.html",
  "./chapters/29.4_Κάθοδος_προς_τη_Ρωμαϊκή_Αγορά.html",
  "./chapters/30.10_Οικία_των_Εστιάδων_Παρθένων.html",
  "./chapters/30.11_Ναός_της_Εστίας.html",
  "./chapters/30.12_Αψίδα_του_Τίτου.html",
  "./chapters/30.1_Είσοδος_στη_Ρωμαϊκή_Αγορά.html",
  "./chapters/30.2_Αψίδα_του_Σεπτίμιου_Σεβήρου.html",
  "./chapters/30.3_Curia_Julia_Η_Σύγκλητος.html",
  "./chapters/30.4_Rostra_Το_Βήμα_των_Ρητόρων.html",
  "./chapters/30.5_Ναός_του_Κρόνου.html",
  "./chapters/30.6_Umbilicus_Urbis_και_Milliarium_Aureum.html",
  "./chapters/30.7_Via_Sacra_Ιερά_Οδός.html",
  "./chapters/30.8_Ναός_του_Αντωνίνου_και_της_Φαυστίνας.html",
  "./chapters/30.9_Ναός_του_Θεοποιημένου_Ιουλίου_Καίσαρα.html",
  "./chapters/31.1_Ανάβαση_στον_Παλατίνο_Λόφο.html",
  "./chapters/31.2_Ανάκτορα_του_Δομιτιανού.html",
  "./chapters/31.3_Στάδιο_του_Δομιτιανού.html",
  "./chapters/31.4_Κήποι_Farnese.html",
  "./chapters/31.5_Πανοραμική_Θέα_Ρωμαϊκής_Αγοράς.html",
  "./chapters/31.6_Οικία_του_Αυγούστου.html",
  "./chapters/31.7_Θέα_προς_Circus_Maximus.html",
  "./chapters/32.1_Circus_Maximus.html",
  "./chapters/32.2_Κήπος_των_Πορτοκαλιών.html",
  "./chapters/32.3_Κλειδαρότρυπα_Ιπποτών_Μάλτας.html",
  "./chapters/32.4_Βασιλική_Santa_Sabina.html",
  "./chapters/33.0_Εισαγωγή_στο_Βατικανό_Ενοποιημένη.html",
  "./chapters/33.10_Καπέλα_Σιστίνα_Μέρος_Α_Είσοδος_και_Ιστορία.html",
  "./chapters/33.11_Καπέλα_Σιστίνα_Μέρος_Β_Η_Οροφή_του_Μιχαήλ_Αγγέλου.html",
  "./chapters/33.12_Καπέλα_Σιστίνα_Μέρος_Γ_Η_Δημιουργία_του_Αδάμ.html",
  "./chapters/33.13_Καπέλα_Σιστίνα_Μέρος_Δ_Η_Δευτέρα_Παρουσία.html",
  "./chapters/33.14_Καπέλα_Σιστίνα_Μέρος_Ε_Κονκλάβιο_και_Εκλογή_Πάπα.html",
  "./chapters/33.1_Μουσεία_Βατικανού_Είσοδος_και_Πρακτικές_Πληροφορίες.html",
  "./chapters/33.2_Αυλή_της_Κουκουνάρας_Cortile_della_Pigna.html",
  "./chapters/33.3_Μουσείο_Πίο_Κλεμεντίνο.html",
  "./chapters/33.4_Λαοκόων.html",
  "./chapters/33.5_Απόλλων_του_Belvedere.html",
  "./chapters/33.6_Γκαλερί_των_Κηροπηγίων.html",
  "./chapters/33.7_Γκαλερί_των_Ταπισερί.html",
  "./chapters/33.8_Γκαλερί_των_Χαρτών.html",
  "./chapters/33.9_Δωμάτια_του_Ραφαήλ.html",
  "./chapters/34.0_Βασιλική_του_Αγίου_Πέτρου_Εισαγωγή.html",
  "./chapters/34.1_Η_Πιετά_του_Μιχαήλ_Αγγέλου.html",
  "./chapters/34.2_Το_Μπαλντακίνο_του_Μπερνίνι.html",
  "./chapters/34.3_Confessio_και_Τάφος_Αγίου_Πέτρου.html",
  "./chapters/34.4_Ο_Τρούλος_της_Βασιλικής_του_Αγίου_Πέτρου.html",
  "./chapters/34.5_Ο_Θρόνος_του_Αγίου_Πέτρου.html",
  "./chapters/34.6_Παπικά_Μνημεία_και_Παρεκκλήσια.html",
  "./chapters/35.0_Πλατεία_του_Αγίου_Πέτρου_Εισαγωγή.html",
  "./chapters/35.1_Ο_Αιγυπτιακός_Οβελίσκος_του_Αγίου_Πέτρου.html",
  "./chapters/35.2_Οι_Κιονοστοιχίες_του_Μπερνίνι.html",
  "./chapters/35.3_Οι_Κρήνες_της_Πλατείας_του_Αγίου_Πέτρου.html",
  "./chapters/36.0_Κάστρο_του_Αγίου_Αγγέλου_Εισαγωγή.html",
  "./chapters/36.1_Γέφυρα_του_Αγίου_Αγγέλου.html",
  "./chapters/36.2_Το_Μαυσωλείο_του_Αδριανού.html",
  "./chapters/36.3_Τα_Παπικά_Διαμερίσματα_και_Passetto_di_Borgo.html",
  "./chapters/36.4_Βεράντα_Αρχαγγέλου_Μιχαήλ_και_Πανοραμική_Θέα.html",
  "./chapters/37.0_Πιάτσα_Ναβόνα_Εισαγωγή.html",
  "./chapters/37.1_Σιντριβάνι_των_Τεσσάρων_Ποταμών.html",
  "./chapters/37.2_Εκκλησία_Sant_Agnese_in_Agone.html",
  "./chapters/37.3_Σιντριβάνι_του_Ποσειδώνα_και_του_Μαυριτανού.html",
  "./chapters/38.0_Πάνθεον_Εισαγωγή.html",
  "./chapters/38.1_Το_Εσωτερικό_του_Πάνθεον_και_ο_Θόλος.html",
  "./chapters/38.2_Ο_Τάφος_του_Ραφαήλ_και_οι_Βασιλικοί_Τάφοι.html",
  "./chapters/39.0_Φοντάνα_ντι_Τρέβι_Εισαγωγή.html",
  "./chapters/39.1_Ο_Ωκεανός_και_ο_Συμβολισμός_της_Φοντάνα_ντι_Τρέβι.html",
  "./chapters/39.2_Αφθονία_Υγεία_και_Θρύλος_του_Νομίσματος.html",
  "./chapters/40.0_Ισπανικά_Σκαλιά_Εισαγωγή.html",
  "./chapters/40.1_Σιντριβάνι_Barcaccia.html",
  "./chapters/40.2_Ανάβαση_στα_Ισπανικά_Σκαλιά_και_Trinita_dei_Monti.html",
  "./chapters/40.3_Οβελίσκος_Sallustiano_και_Θέα_από_την_Κορυφή.html",
  "./chapters/41.0_Via_dei_Condotti_Εισαγωγή.html",
  "./chapters/41.1_Antico_Caffe_Greco.html",
  "./chapters/42.0_Via_del_Corso_Εισαγωγή.html",
  "./chapters/43.0_Piazza_del_Popolo_Εισαγωγή.html",
  "./chapters/43.1_Ο_Οβελίσκος_Flaminio.html",
  "./chapters/43.2_Οι_Δίδυμες_Εκκλησίες_της_Piazza_del_Popolo.html",
  "./chapters/43.3_Santa_Maria_del_Popolo.html",
  "./chapters/44.0_Κήποι_Pincio_Εισαγωγή.html",
  "./chapters/44.1_Terrazza_del_Pincio_Πανοραμική_Θέα.html",
  "./chapters/45.0_Villa_Borghese_Εισαγωγή.html",
  "./chapters/45.1_Galleria_Borghese.html",
  "./chapters/45.2_Λίμνη_Villa_Borghese_και_Ναός_Ασκληπιού.html",
  "./chapters/45.3_Bioparco_di_Roma.html",
  "./classic-home.html",
  "./diagnostics.html",
  "./favorites.html",
  "./final-check.html",
  "./full-guide.html",
  "./index.html",
  "./library.html",
  "./manifest.webmanifest",
  "./map.html",
  "./pois.html",
  "./practical-verified.html",
  "./practical.html",
  "./restaurants.html",
  "./shopping.html",
  "./walk.html"
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Cache files independently so one missing optional file cannot abort installation.
    await Promise.allSettled(OFFLINE_FILES.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request, {ignoreSearch: true});
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch (error) {
      if (event.request.mode === 'navigate') {
        return (await caches.match('./index.html')) || Response.error();
      }
      return Response.error();
    }
  })());
});
