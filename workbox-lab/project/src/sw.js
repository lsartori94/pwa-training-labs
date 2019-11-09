importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute([]);

  // Images cache
  const imagesHandler = workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  });
  workbox.routing.registerRoute(
    /(.*)articles(.*)\.(?:png|gif|jpg)/,
    args => {
      return imagesHandler.handle(args);
    }
  );

  // User avatar cache
  const avatarHandler = workbox.strategies.staleWhileRevalidate({
    cacheName: 'icon-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  });
  workbox.routing.registerRoute(
    /(.*)images\/icon\/(.*)/,
    args => {
      return avatarHandler.handle(args);
    }
  );

  // Articles cache
  const articleHandler = workbox.strategies.networkFirst({
    cacheName: 'articles-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
    return articleHandler.handle(args)
      .then(response => {
        if (!response) {
          return caches.match('pages/offline.html');
        } else if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return response;
      })
  });

  // Posts cache
  const postHandler = workbox.strategies.cacheFirst({
    cacheName: 'posts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  workbox.routing.registerRoute(/(.*)pages\/post(.*)\.html/, args => {
    return articleHandler.handle(args)
      .then(response => {
        if (!response) {
          return caches.match('pages/offline.html');
        } else if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return response;
      })
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
