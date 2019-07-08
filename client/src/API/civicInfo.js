export const getCivicInfo = async address => {
    const response = await fetch(`/api/civic_info/${address}`);
    const data = await response.json();
    return data;
}