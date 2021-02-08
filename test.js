function wait(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

calculate = async function() {
    await calculateInternal(1, true);
    await wait(1000);
    await calculateInternal(2, true);
    await wait(1000);
    await calculateInternal(3, true);
    await wait(1000);
    await calculateInternal(4, true);
    await wait(1000);
    await calculateInternal(5, true);
    await wait(1000);
    await calculateInternal(7, true);
    await wait(1000);
    await calculateInternal(9, true);
    await wait(1000);
    await calculateInternal(13, true);
    await wait(1000);
    await calculateInternal(17, true);
    await wait(1000);
    await calculateInternal(19, true);
    await wait(1000);
    await calculateInternal(25, true);
    await wait(1000);
    await calculateInternal(30, true);
    await wait(1000);
    await calculateInternal(35, true);
    await wait(1000);
    await calculateInternal(45, true);
    await wait(1000);
    await calculateInternal(50, true);
    await wait(1000);
    await calculateInternal(75, true);
    await wait(1000);
    await calculateInternal(100, true);
    await wait(1000);
    await calculateInternal(200, true);
    await wait(1000);
    await calculateInternal(300, true);
    await wait(1000);
    await calculateInternal(500, true);
}