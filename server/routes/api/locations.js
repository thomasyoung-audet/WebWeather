const fetch = require('node-fetch');

module.exports = (app) => {

	let zipcode;

	app.post('/search-location', (req, res) => {

		zipcode = req.body.zipcode;

		if(!zipcode || zipcode.length < 3 || zipcode.length > 6) {//zip codes in canada
			res.redirect('/error');
		} else { 
			zipcode = zipcode.substring(0,3);
			res.redirect('/current-weather');
		}
	})

	app.get('/search-location-weather', (req, res) => {
		//build api URL with user zip
		const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';	
		const apiId = ',ca&appid=___&units=metric';

		const userLocation = (url1, url2, zipcode) => {

		   let newUrl = url1 + zipcode + url2;
		   return newUrl;
		};	

		const apiUrl = userLocation(baseUrl, apiId, zipcode);
		//console.log(apiUrl);

		fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			res.send({ data });
		})
		.catch(err => {
			res.redirect('/error');
		});

	})

}