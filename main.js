const apiKey = "69e6ec84abef4af99a5160524240909"; // استبدل هذا بمفتاح API الخاص بـ WeatherAPI

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        document.getElementById("weatherInfo").innerHTML = `<p>يرجى إدخال اسم المدينة.</p>`;
        return;
    }

    // عنوان URL الجديد لـ WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ar`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.location) {
                const weatherData = `
                    <div class="weather-card">
                        <h3>${data.location.name}, ${data.location.country}</h3>
                        <p>درجة الحرارة: ${data.current.temp_c} °C</p>
                        <p>الطقس: ${data.current.condition.text}</p>
                        <p>الرطوبة: ${data.current.humidity}%</p>
                        <p>سرعة الرياح: ${data.current.wind_kph} كلم/س</p>
                        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                    </div>
                `;
                document.getElementById("weatherInfo").innerHTML = weatherData;
            } else {
                document.getElementById("weatherInfo").innerHTML = `<p>المدينة غير موجودة!</p>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("weatherInfo").innerHTML = `<p>تعذر جلب البيانات: ${error.message}</p>`;
        });
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const toggleIcon = document.getElementById('toggle');
    if (toggleIcon.classList.contains('bx-toggle-left')) {
        toggleIcon.classList.remove('bx-toggle-left');
        toggleIcon.classList.add('bx-toggle-right');
    } else {
        toggleIcon.classList.remove('bx-toggle-right');
        toggleIcon.classList.add('bx-toggle-left');
    }
}
