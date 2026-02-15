self.addEventListener('push', event => {
   const data = event.data ? event.data.json() :
         { title: 'No Title', body: 'No Body' };
   console.log('Push received:', data);

   const title = data.title || 'Push Notification';
   const options = {
      body: data.body || 'You have a new notification.',
      icon: 'icon.png', // Optional: add an icon
      badge: 'badge.png' // Optional
   };

   event.waitUntil(self.registration.showNotification(title, options));
});
