const apiKey = config.TOMTOM_API_KEY;

// tt.setProductInfo("Google Maps Clone", "1.0")

// const supported = tt.supported();

navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    // console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([23.32, 42.7])
}

function setupMap(center) {
    let map = tt.map({
        key: apiKey,
        container: "map",
        center: center,
        zoom: 15
    })

    map.addControl(new tt.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    map.addControl(new tt.FullscreenControl({
        container: document.querySelector('body')
    }));

    map.on('load', () => {
        new tt.Marker().setLngLat(center).addTo(map)
    })

    const nav = new tt.NavigationControl({});
    map.addControl(nav, 'bottom-right');

    const scale = new tt.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    });
    map.addControl(scale);
    // scale.setUnit('imperial');
}
