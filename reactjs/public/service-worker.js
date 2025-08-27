self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : { title: 'New Message', body: 'You have a new message' };
    const options = {
        body: data.body,
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'chat-message',
        requireInteraction: true,
        actions: [
            {
                action: 'view',
                title: 'View Message'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/chat')
        );
    }
});

self.addEventListener('notificationclose', event => {
    console.log('Notification closed');
});
