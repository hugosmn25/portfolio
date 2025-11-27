document.addEventListener("DOMContentLoaded", () => {
  // URL du flux RSS que vous voulez afficher (via le proxy RSS2JSON)
  const rssFeedUrl =
    "https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml";
  const rss2jsonProxyUrl =
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    rssFeedUrl
  )}`;

  fetch(rss2jsonProxyUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.items && data.items.length > 0) {
        displayRssFeed(data.items);
      } else {
        console.log("Aucun article trouvé dans le flux RSS.");
        document.getElementById("rss-items").innerHTML =
          '<li class="text-gray-500 py-4">Impossible de charger les actualités pour le moment.</li>';
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du flux RSS:", error);
      document.getElementById("rss-items").innerHTML =
        '<li class="text-red-500 py-4">Erreur lors du chargement du flux RSS.</li>';
    });

  function displayRssFeed(items) {
    const rssItemsList = document.getElementById("rss-items");
    rssItemsList.innerHTML = ""; // Nettoyer le contenu existant

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "py-6"; // Augmentation du padding vertical

      const title = document.createElement("h3");
      title.className = "text-xl font-semibold mb-2";

      const link = document.createElement("a");
      link.href = item.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer"; // Bonne pratique de sécurité
      link.textContent = item.title;
      link.className =
        "text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out";
      title.appendChild(link);

      const description = document.createElement("p");
      // Utiliser une div temporaire pour nettoyer le HTML de la description avant de prendre le textContent
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = item.description;
      // Prendre un extrait du texte pur, sans HTML
      description.textContent = tempDiv.textContent.substring(0, 200) + "...";
      description.className = "text-gray-300 mt-2 leading-relaxed";

      const pubDate = document.createElement("span");
      // Formater la date en français
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      pubDate.textContent = new Date(item.pubDate).toLocaleDateString(
        "fr-FR",
        dateOptions
      );
      pubDate.className = "block text-sm text-gray-400 mt-3";

      listItem.appendChild(title);
      listItem.appendChild(description);
      listItem.appendChild(pubDate);

      rssItemsList.appendChild(listItem);
    });
  }
});