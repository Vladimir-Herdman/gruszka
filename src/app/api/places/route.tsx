import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { lat, long } = await req.json();

  const body = {
    includedPrimaryTypes: ['supermarket', 'convenience_store'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: long },
          radius: 16000, //10 miles
        },
      },
  };

  const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY!,
      'X-Goog-FieldMask':
      'places.displayName,places.formattedAddress,places.location,places.googleMapsUri',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
