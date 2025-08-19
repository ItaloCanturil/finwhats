
export async function POST (request: Request) {
    const body = await request.json();
    
    
    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }
    
    console.log(body);
    
    return new Response("OK");
}