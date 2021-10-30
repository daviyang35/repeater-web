interface MenuObject {
    type: number,
    code: string,
    child: [MenuObject],
}

const items = (data: any, menus: any[], buttons: any[]) => {
    data.forEach((item: MenuObject) => {
        if (item.type === 1) {
            menus.push(item.code);
        } else {
            buttons.push(item.code);
        }
        if (item.child && item.child.length > 0) {
            items(item.child, menus, buttons);
        }
    });
};
const getAuthority = (data: any) => {
    let menus: any[] = [];
    let buttons: any[] = [];
    items(data, menus, buttons);
    return {menus, buttons: buttons};
};

export {getAuthority};
