// Function to fetch and display 100 unique cat images from The Cat API
async function fetchCatImages() {
  const apiURL = "https://api.thecatapi.com/v1/images/search?limit=10"; // API endpoint for 10 random cat images
  const totalImagesNeeded = 100;
  const imageContainer = document.getElementById("cat-image-container"); // Ensure an element with this ID exists in HTML
  const seenImageIDs = new Set(); // To track unique image IDs and avoid duplicates

  try {
    // Fetch images in batches until we have 100 unique images
    while (seenImageIDs.size < totalImagesNeeded) {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const images = await response.json(); // Parse response JSON (array of image objects)

      for (const imgData of images) {
        // If we don't already have this image and still need more, use it
        if (
          !seenImageIDs.has(imgData.id) &&
          seenImageIDs.size < totalImagesNeeded
        ) {
          seenImageIDs.add(imgData.id);

          // Create an <img> element for the cat image
          const imgElement = document.createElement("img");
          imgElement.src = imgData.url;
          imgElement.alt = "Cute cat"; // Alt text for accessibility
          imgElement.loading = "lazy"; // Enable lazy loading for performance
          imgElement.classList.add("cat-image"); // Add class for styling (responsive layout)

          // Append the image to the container in the DOM
          imageContainer.appendChild(imgElement);
        }
      }
      // The loop will automatically continue until seenImageIDs.size >= totalImagesNeeded
    }

    console.log(`Successfully fetched ${seenImageIDs.size} unique cat images.`);
  } catch (error) {
    console.error("Error fetching cat images:", error);
  }
}

// Invoke the function to start fetching images
fetchCatImages();
