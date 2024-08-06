console.log("Linked"); 

const myHeaders = new Headers();  
        myHeaders.append("x-apihub-key", "M2LKKoGCuUe5tDcpTshLVPhxBQMVLw0QwJheozIhmrQgox6oF2");  
        myHeaders.append("x-apihub-host", "Vehicle-Hub-API.allthingsdev.co");  
        myHeaders.append("x-apihub-endpoint", "b9ea652b-1692-478e-bff3-31cce31199d7");  

        const requestOptions = {  
            method: "GET",  
            headers: myHeaders,  
            redirect: "follow"  
        }; 

fetch("https://Vehicle-Hub-API.proxy-production.allthingsdev.co/api/vehicles/GetMakesForManufacturerAndYear/Honda?year=2024&format=json", requestOptions)  
    .then((response) => {  
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
        return response.json();  
    })  
    .then((data) => {  
        console.log(data);  

         
        if (data && data.Results && Array.isArray(data.Results)) {  
            // Map the vehicle data using correct property names
            const relevantVehicles = data.Results.map(vehicle => ({  
                makeName: vehicle.MakeName,  
                mfrName: vehicle.MfrName
            }));  

            //link vehicle name to website
            const vehicle1Element = document.getElementById('vehicle1');  
            const vehicle2Element = document.getElementById('vehicle2');  

            if (vehicle1Element && vehicle2Element) {  
                if (relevantVehicles.length > 1) {  
                    vehicle1Element.innerText = `Make: ${relevantVehicles[0].makeName}, Manufacturer: ${relevantVehicles[0].mfrName}`;  
                    vehicle2Element.innerText = `Make: ${relevantVehicles[1].makeName}, Manufacturer: ${relevantVehicles[1].mfrName}`;  
                } else {  
                    vehicle1Element.innerText = 'Not enough vehicles found.';  
                }  
            } else {  
                console.error('Vehicle elements not found in the DOM.');  
            }  
        } else {  
            console.error('Unexpected data structure:', data);  
        }  
    })  
    .catch((error) => console.error('Error fetching data:', error));