async function getRandomVerse() {
    try {
        // Generate a random Ayah number (1 to 6236)
        const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;

        // Fetch Arabic verse
        const arabicResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/ar.alafasy`);
        const arabicData = await arabicResponse.json();

        // Fetch English translation
        const translationResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/en.asad`);
        const translationData = await translationResponse.json();

        // Extract data
        const arabicAyah = arabicData.data.text;
        const englishTranslation = translationData.data.text;
        const surahName = arabicData.data.surah.englishName;
        const ayahNumber = arabicData.data.numberInSurah;

        // Update the DOM
        document.getElementById("ayah").textContent = arabicAyah;
        document.getElementById("translation").textContent = englishTranslation;
        document.getElementById("details").textContent = `Surah: ${surahName}, Ayah: ${ayahNumber}`;
    } catch (error) {
        console.error("Error fetching Quran data:", error);
        document.getElementById("ayah").textContent = "Error loading verse.";
        document.getElementById("translation").textContent = "Please try again later.";
        document.getElementById("details").textContent = "";
    }
}

// Load a random verse on page load
window.onload = getRandomVerse;