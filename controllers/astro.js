
// import axios from "axios"

// exports.astroCity = (req, res, next) => {
//     console.log("REQ PARAMS ASTRO",req.query);
//     return new Promise((resolve, reject) => {
//         // miss request
//           .get(
//             `https://api.weatherapi.com/v1/astronomy.json?key=43c3940307aa4e549ee130304231504&q=${loc}`
//           )
//           .then((res) => {

//             let userData = {
//               locality: res.data.location.localityName,
//               country: res.data.country.name,
//               IpAdress: res.data.ip,
//               date: res.data.location.timeZone.localTime.split("T")[0],
//               hour: res.data.location.timeZone.localTime
//                 .split("T")[1]
//                 .split(".")[0],
//             };
//             this.locality = userData.locality
//             let localityCity = userData.locality
//             this.localHour = res.data.location.timeZone.localTime
//             this.sunTime(localityCity)
//             return resolve(res);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       });
   
// }
