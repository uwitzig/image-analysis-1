var config = {
	watson: {
		visual_recognition: {
			url:'https://gateway-a.watsonplatform.net/visual-recognition/api',
			api_key: '',
			version_date: '2016-05-20'
		},
		text_to_speech: {
			url:'https://stream.watsonplatform.net/text-to-speech/api',
			username: '',
			password: '',
			version: 'v1'
		},
		language_translator: {
			url: 'https://gateway.watsonplatform.net/language-translator/api',
			username: '',
			password: '',
			version: 'v2'
		}
	}
};
module.exports = config;
