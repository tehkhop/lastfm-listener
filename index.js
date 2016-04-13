/**
 *
 * @name lastfm-listener
 * @author Lachlan 
 * @license MIT
 * @description Fires events when a new song is played
 *
 **/

'use strict';

const request = require('request');
const EventEmitter = require('events').EventEmitter;
 
class LastFMListener extends EventEmitter
{
	
	constructor(config) {
		
		super();
		
		this.config = {
			api_key: config.api_key || '',
			username: config.username || '',
			rate: config.rate || 5,
			alert_initial: (typeof config.alert_initial == 'undefined' ? true : config.alert_initial)
		};
		
		this.api_url = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${this.config.username}&api_key=${this.config.api_key}&format=json&limit=1`;
		this.latest_song = null;
		this.interval_object = null;
		
		this.getLatestSong((song) => {
			if(this.config.alert_initial) {
				this.emit('song', song);
			} else {
				this.latest_song = song;
			}
		});
		
		this.on('song', (song) => {
			this.latest_song = song;
		});
		
	}
	
	getLatestSong(callback) {
		
		let self = this;
		
		request({
			url: self.api_url,
			method: 'GET',
			json: true
		}, function (err, res, body) {
			
			if(err) {
				return console.log('Error getting latest song: ', err);
			}
			
			let latest_song = body.recenttracks.track[0];
			
			callback(latest_song);
			
		});
		
	}
	
	checkSong(callback) {
		
		this.getLatestSong((song) => {
			
			// If it's a new song
			if(song.artist['#text'] != this.latest_song.artist['#text'] || song.name != this.latest_song.name) {
				this.emit('song', song);
				callback(song);
			} else {
				callback(null);
			}
			
		});
		
	}
	
	start() {
		this.interval_object = setInterval(() => {
			this.checkSong();
		}, this.config.rate * 1000);
	}
	
	stop() {
		clearInterval(this.interval_object);
	}
	
}

module.exports = LastFMListener;
