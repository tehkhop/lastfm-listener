# lastfm-listener

## What is it? Why do I want it?

You can lastfm-listener to trigger events when a new song is played on a lastfm account.

### Example Uses

Ok... so I know what it is... but why would I use it exactly?

Up to you!

Things that this oculd be usefull for:
 - "Currently playing" twitch banner on custom overlay
 - Desktop widget with currently playing
 - Web widget for what someones currently playing

## API

lastfm-listener extends EventEmitter and has all of it's methods.

### Constructor

```js
const LastFM = require('lastfm-listener');
const options = {
    api_key: 'http://www.last.fm/api/',
    username: 'my lastfm username',
    rate: 5,
    alert_intial: true,
    only_if_playing: true
};

let lastFM = new LastFM(options);
```

### Constructor Options

 - `api_key` - Your API key. You can get one here http://www.last.fm/api/. `Required`
 - `username` - The username you want to listen for songs at. `Required`
 - `rate` - How often in seconds you want to check the API. `Optional, defaults to 5 seconds.`
 - `alert_intial` - When the first song is loaded, do you want it to fire the event? `Optional, defaults to true.`
 - `only_if_playing` - Require song to have "currently playing" tag. `Optional, defaults to false.`

### Methods

 - `getLatestSong` - Pretty self explantory. Will get the latest currently playing song.
 - `checkSong` - Force check to see if the song is new.
 - `start` - Start checking the API.
 - `stop` - Stop checking the API.
 - All EventEmitter methods .on, .emit, etc.

### Events

The only availble event is 'song'. Bind it like this:

```js
lastFM.on('song', function(song) {
	
	console.log(song.name); // "Never Gonna Give You Up"
	console.log(song.artist); // "Rick Astley"

});
```

### Example Code

```js
const LastFM = require('lastfm-listener');
const options = {
    api_key: 'http://www.last.fm/api/',
    username: 'my lastfm username',
    rate: 5,
    alert_intial: true,
    only_if_playing: true
};

let lastFM = new LastFM(options);

lastFM.on('song', (song) => {
    console.log("Details about new song! ", song);
});

lastFM.start();
```

## License

The MIT License (MIT)

Copyright (c) 2016 Lachlan Davidson @tehkhop lachlan@lachlandavidson.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
