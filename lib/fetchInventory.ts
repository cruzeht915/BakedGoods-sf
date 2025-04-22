export default async function fetchInventory(pickupDate: string) {
    const res = await fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: pickupDate }),
    })
    return await res.json()
    
}