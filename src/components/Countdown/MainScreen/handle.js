import PushNotification from 'react-native-push-notification';

export function handleTime(time) {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 3600);
	hours = hours < 10 ? '0' + `${hours}` : `${hours}`;
	minutes = minutes < 10 ? '0' + `${minutes}` : `${minutes}`;
	seconds = seconds < 10 ? '0' + `${seconds}` : `${seconds}`;
	return hours + ':' + minutes + ':' + seconds;
}

export async function scheduleNotification(date, time) {
	PushNotification.localNotificationSchedule({
		date: date, // in 30 secs

		/* Android Only Properties */
		id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
		ticker: 'My Notification Ticker', // (optional)
		autoCancel: true, // (optional) default: true
		largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
		smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
		bigText: `Đã hết ${handleTime(time)}`, // (optional) default: none
		color: 'blue', // (optional) default: system default
		vibrate: true, // (optional) default: true
		vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
		tag: 'some_tag', // (optional) add tag to message
		group: 'group', // (optional) add group to message
		ongoing: false, // (optional) set whether this is an "ongoing" notification
		/* iOS only properties */
		alertAction: 'view', // (optional) default: view
		category: null, // (optional) default: null
		userInfo: null, // (optional) default: null (object containing additional notification data)

		/* iOS and Android properties */
		title: 'Hẹn giờ', // (optional)
		message: 'Đã hết giờ rồi', // (required)
		playSound: true, // (optional) default: true
		soundName: 'dahetgioroi.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
	});
}

export function cancelNotification(id) {
	PushNotification.cancelLocalNotifications({id: id});
}