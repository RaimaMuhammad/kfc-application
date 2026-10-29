import axios from "axios"
import SliderData from "../SliderData.json"



export const getdata= async (url)=>{

try {
	let res=await axios.get(url)
	let {data}= await res;
	return data;
} catch (error) {
	const menuType = new URL(url).searchParams.get("type");
	if (!url.includes("/api/product/menu") || !menuType) {
		throw error;
	}

	const seenTitles = new Set();
	return [...SliderData.featured, ...SliderData.favorites, ...SliderData.quickbites]
		.filter((item) => {
			if (item.type !== menuType || seenTitles.has(item.title)) {
				return false;
			}
			seenTitles.add(item.title);
			return true;
		})
		.map((item) => ({
			...item,
			_id: `${menuType}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
		}));
}

} 