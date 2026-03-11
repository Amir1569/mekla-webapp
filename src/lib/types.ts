export type Dish = {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    allergens: string[];
    image_url?: string;
    is_active: boolean;
    cook_time?: number;
    tags?: string[];
    spice_level?: number; // 0-3
};

export type Slot = {
    id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
    capacity: number;
};

export type CartItem = {
    dish_id: string;
    quantity: number;
    portion_size: "2p" | "4p";
};

export type OrderPayload = {
    full_name: string;
    address: string;
    slot_id: string | null;
    items: CartItem[];
};