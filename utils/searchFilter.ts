  
  export async function searchFilter<T>(query: string, endpoint: string): Promise<T> {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  }