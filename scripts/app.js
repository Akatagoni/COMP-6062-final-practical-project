const app = Vue.createApp({
    data() {
        return {
            firstName: "Arun",
            lastName: "Katagoni",
            user: null,

            city: 'London',
            province: 'Ontario',
            country: 'Canada',
            weather: null,
            word: '',
            definition: null

        };
    },
    
    computed: {
        myFullName() {
            return this.firstName + " " + this.lastName;
        }
    },

    created() {
        this.fetchUser();
        this.fetchWeather();
    },
    methods: {
        fetchUser() {
            fetch("http://comp6062.liamstewart.ca/random-user-profile")
                .then(response => response.json())
                .then(data => {
                    console.log("User Data:", data); 
                    this.user = {
                        name: `${data.first_name} ${data.last_name}`,
                        age: data.age,
                        picture: data.profile_picture
                    };
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                });
        },
        fetchWeather() {
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Weather data:", data);
                    this.weather = {
                        temp: data.temperature,
                        wind: data.wind_speed,           
                        desc: data.weather_description     
                    };
                })
                .catch(error => {
                    console.error("Error fetching weather:", error);
                });
        },          
        fetchDefinition() {
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
                .then(response =>response.json())
                .then(data => {
                    console.log("Definition data:", data); 
                    const firstResult = data[0]; 
        
                    this.definition = {
                        word: firstResult.word,
                        phonetic: firstResult.phonetic,
                        meaning: firstResult.definition
                    };
                })
                .catch(error => {
                    console.error("Error fetching definition:", error);
                });
        }        
    }
});

app.mount('#app');
