// pages/api/geocode.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { address } = req.body;
  
      const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Make sure to set your API key in .env.local
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          res.status(200).json({ lat, lng });
        } else {
          res.status(422).json({ message: 'Could not geocode address' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    } else {
      // Handle any requests that aren't POST
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  