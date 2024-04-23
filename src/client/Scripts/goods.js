import { goodsDB } from "./database";

async function getGoods() {
    try {
        const goods = await goodsDB.allDocs({ include_docs: true });
        return goods.rows.map(row => row.doc);
    } catch (error) {
        console.error(error);
    }
}

async function addGood(good) {
    try {
        const response = await goodsDB.post(good);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function updateGood(good) {
    try {
        const response = await goodsDB.put(good);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function deleteGood(good) {
    try {
        const response = await goodsDB.remove(good);
        return response;
    } catch (error) {
        console.error(error);
    }
}

function renderGoods(goods) {
    const goodsList = getGoods();
}

export { getGoods, addGood, updateGood, deleteGood, renderGoods };