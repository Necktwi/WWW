self.addEventListener('push', event => {
    const data= event.data? event.data.json() :
          { user: 'ferryfair', thingName: null, msg: null };
    console.log('Push received:', data);
    event.waitUntil(pushNotify(data));
});

async function pushNotify (data) {
    const clients= await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
        client.postMessage({ type: 'ffPush', data: data });
    }
    const title= data.user? data.user + ':' : 'Push Notification';
    const options= {
 //      icon: 'icon.png', // Optional: add an icon
 //      badge: 'badge.png', // Optional
       body: (data.thingName? data.thingName + '< ' : '') +
            (data.msg || 'You have a new notification.')
    };
    self.registration.showNotification(title, options);
}
