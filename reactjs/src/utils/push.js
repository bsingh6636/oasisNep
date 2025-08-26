import axios from 'axios';
import { BackendPort } from '../Const/url';
import authHeader from '../api/auth-header';

const VAPID_PUBLIC_KEY = 'BDmfxBByRAmvyeToAaF7Gc4N6wWKxk9mMysZs_O1TJPGBPgIJGqD7-c5n_EZYRFlxC6r8bZBq1pi0m1Jv9Ognys';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeToPush = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push messaging is not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    let subscription = await registration.pushManager.getSubscription();

    if (subscription === null) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      await axios.post(`${BackendPort}/push/subscribe`, subscription, { headers: authHeader() });
    }
  } catch (error) {
    console.error('Error subscribing to push notifications', error);
  }
};
