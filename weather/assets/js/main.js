const API_KEY = '763564c8445946ffb26225151250202';

async function fetchWeatherData(city) {
    try {
        console.log(`Fetching weather data for city: ${city}`);
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&astronomy=yes`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Weather data fetched successfully:', data);
        renderWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-content').innerHTML = `
            <p>Unable to fetch weather data. Please try again.</p>
        `;
    }
}

function renderWeatherData(data) {
    const weatherContent = document.getElementById('weather-content');
    const lastUpdatedElem = document.getElementById('last-updated');

    console.log('Rendering weather data:', data);

    const astronomy = data.forecast.forecastday[0].astro;

    weatherContent.innerHTML = `
        <div class="weather-main">
            <div class="temperature">${Math.round(data.current.temp_c)}°C</div>
            <img class="weather-icon" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        </div>
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>${data.current.condition.text}</p>
        
        <div class="weather-details">
            <div class="detail-card">
                <h4>Humidity</h4>
                <p>${data.current.humidity}%</p>
            </div>
            <div class="detail-card">
                <h4>Wind Speed</h4>
                <p>${data.current.wind_kph} km/h</p>
            </div>
            <div class="detail-card">
                <h4>UV Index</h4>
                <p>${data.current.uv}</p>
            </div>
            <div class="detail-card">
                <h4>Pressure</h4>
                <p>${data.current.pressure_mb} mb</p>
            </div>
            <div class="detail-card">
                <h4>Cloud Cover</h4>
                <p>${data.current.cloud}%</p>
            </div>
            <div class="detail-card">
                <h4>Feels Like</h4>
                <p>${Math.round(data.current.feelslike_c)}°C</p>
            </div>
            <div class="detail-card">
                <h4>Visibility</h4>
                <p>${data.current.vis_km} km</p>
            </div>
            <div class="detail-card">
                <h4>Air Quality</h4>
                <p>CO: ${data.current.air_quality.co.toFixed(2)}</p>
                <p>NO2: ${data.current.air_quality.no2.toFixed(2)}</p>
                <p>O3: ${data.current.air_quality.o3.toFixed(2)}</p>
                <p>PM2.5: ${data.current.air_quality.pm2_5.toFixed(2)}</p>
                <p>PM10: ${data.current.air_quality.pm10.toFixed(2)}</p>
            </div>
            <div class="detail-card">
                <h4>Sunrise & Sunset</h4>
                <div class="sunrise-sunset">
                    <p>🌅 ${astronomy.sunrise}</p>
                    <p>🌇 ${astronomy.sunset}</p>
                </div>
            </div>
            <div class="detail-card">
                <h4>Moon Phase</h4>
                <p>${astronomy.moon_phase}</p>
                <p>🌕 ${astronomy.moon_illumination}% Illuminated</p>
            </div>
            <div class="detail-card">
                <h4>Moonrise & Moonset</h4>
                <div class="moon-times">
                    <p>🌖 ${astronomy.moonrise}</p>
                    <p>🌔 ${astronomy.moonset}</p>
                </div>
            </div>
            <div class="detail-card">
                <h4>Astronomical Twilight</h4>
                <div class="twilight-times">
                    <p>🌄 Dawn: ${astronomy.astronomical_twilight_begin}</p>
                    <p>🌆 Dusk: ${astronomy.astronomical_twilight_end}</p>
                </div>
            </div>
        </div>

        <div class="forecast">
            <h3>3-Day Forecast</h3>
            <div class="forecast-days">
                ${data.forecast.forecastday.map(day => `
                    <div class="forecast-day">
                        <h4>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
                        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                        <p>${Math.round(day.day.maxtemp_c)}°C / ${Math.round(day.day.mintemp_c)}°C</p>
                        <p>${day.day.condition.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    lastUpdatedElem.textContent = `Last Updated: ${data.current.last_updated}`;
    console.log('Weather data rendered successfully');
}

// Initial load and event listener
document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city');
    
    console.log('DOM fully loaded and parsed');

    // Initial load
    console.log(`Initial load for city: ${citySelect.value}`);
    fetchWeatherData(citySelect.value);

    // Event listener for city change
    citySelect.addEventListener('change', (e) => {
        console.log(`City changed to: ${e.target.value}`);
        fetchWeatherData(e.target.value);
    });
});