# Communication Endpoints

## User account

### Login

This request is sent after the 42 API has validated user's credential, no matter whether the user has been registered or not.
```js
/* REQUEST */
GET /user/login?id=id&tfa=tfa
{
	id: String,	// 42 login
	tfa: String	// the Google Auth 6-digit token (can be empty)
}
/* RESPONSE */
{
	id: String,
	ok: Boolean	// true if login successfully, false otherwise
}
```

### Profile

Get some user's basic attributes from their profile
```js
/* REQUEST */
GET /user/profile?id=id
{
	id: String		// 42 login
}
/* RESPONSE */
{
	id: String,
	name: String,	// display name
	avatar: String,	// absolute URL to user's avatar
}
```

Make changes to profile
```js
/* REQUEST */
POST /user/profile
{
	id: String		// 42 login
	name: String,	// display name, if empty default to 42 login
	avatar: String,	// absolute URL to user's avatar, if empty set to default URL
	tfa: Boolean,	// enable or disable 2-factor auth
}
/* RESPONSE */
{
	id: String,
	name: Boolean,	// display name is OK (unique
	avatar: Boolean,// always true, back-end won't check URL validity
	tfa: String		// URL to QR code if tfa turned from false to true, else empty
}
```

Google 2FA validation
```js
/* REQUEST */
POST /user/profile/tfavalidation
{
	id: String		// 42 login
	code: String	// 2FA code coming from user's phone
}
/* RESPONSE */
{
	id: String,
	valid: Boolean
}
```

Get friend/blocked list
```js
/* REQUEST */
GET /user/friends?id=id[&num=num]
GET /user/blocks?id=id[&num=num]
{
	id: String,	// 42 login
	num: Number	// Max number of friends/blocked in response, 0 to get everyone
}
/* RESPONSE */
{
	id: String,
	users: [	// Array of user objects
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
		},
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
		},
		...
	]
}
```

Check if 2 users are friends/blocked
```js
/* REQUEST */
GET /user/friend?id1=id&id2=id
GET /user/block?id1=id&id2=id
{
	id1: String,// 42 login
	id2: String	// 42 login
}
/* RESPONSE */
{
	id1: String,
	id2: String,
	res: Boolean	// is id1 and id2 are friend/blocked
}
```

Add/remove friend/blocked
```js
/* REQUEST */
POST /user/friend
POST /user/block
{
	id1: String,	// 42 login
	id2: String,	// 42 login
	add: Boolean	// true if adding, false if removing
}
/* RESPONSE */
{
	id1: String,
	id2: String,
	res: Boolean	// true if successful (state changed)
}
```

## Game

Get all friends currently playing
```js
/* REQUEST */
GET /game/friendsplaying?id=id
{
	id: String,	// 42 login
}
/* RESPONSE */
{
	id: String,
	users: [	// Array of user objects
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
			game_id: Number	// id of game playing
		},
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
			game_id: Number	// id of game playing
		},
		...
	]
}
```

Get leaderboard
```js
/* REQUEST */
GET /game/leaderboard?[num=num]
{
	num: Number
}
/* RESPONSE */
{
	users: [	// Array of user objects
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
			score: Number	// calculated score
		},
		{
			id: String,
			name: String,	// display name
			avatar: String,	// absolute URL to user's avatar
			score: Number	// calculated score
		},
		...
	]
}
```

Matchmaking
```js
/* URL */
GET /game/matchmaking?id=id
{
	id: String		// 42 login
}
```
Watch a game
```js
/* URL */
GET /game/watch?id=id&gameid=gameid
{
	id: String		// 42 login
	gameid: Number	// game's id
}
```

## Chat

Get all public channels
```js
/* REQUEST */
GET /chat/pubchannels?id=id
{
	id: String	// 42 login
}
/* RESPONSE */
{
	id: String	// 42 login
	channels: [	// Array of channel objects
		{
			// user must not be banned from channel
			chanid: Number,
			type: String,	// public/protected/private (if joined)
		},
		{
			// user must not be banned from channel
			chanid: Number,
			type: String,	// public/protected/private (if joined)
		},
		...
	]
}
```

Get information about a public channel
```js
/* REQUEST */
GET /chat/pubchannel?id=id&chanid=chanid
{
	id: String		// 42 login
	chanid: Number	// id of public channel
}
/* RESPONSE */
{
	chanid: Number
	admins: [	// Array of user objects
		{
			id: String,
			name: String,	// display name
		},
		{
			id: String,
			name: String,	// display name
		},
		...
	]
	joined: [	// Array of user objects who joined channel
		{
			id: String,
			name: String,	// display name
			avatar: String,	// URL to avatar
			online: Boolean
		},
		{
			id: String,
			name: String,	// display name
			avatar: String,	// URL to avatar
			online: Boolean
		},
		...
	]
}
```

Get messages in a channel
```js
/* REQUEST */
GET /chat/messages?id=id&chanid=chanid&from=from&to=to
{
	id: String		// 42 login
	chanid: Number	// id of public channel
	from: Number	// 0 - most recent, n - n most recent messages
	to: Number
}
/* RESPONSE */
{
	chanid: Number
	messages: [	// Array of messages
		{
			msgid: Number,
			sender: {
				id: String	// 42 login
				name: String	// Display name
				avatar: String	// URL to avatar
			},
			content: String	// message's content
		},
		{
			msgid: Number,
			sender: {
				id: String	// 42 login
				name: String	// Display name
				avatar: String	// URL to avatar
			},
			content: String	// message's content
		},
		...
	]
}
```

_TO BE CONTINUED..._
