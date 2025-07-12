import { create } from "zustand";

type SelectedProduct = {
  id: string;
  name: string;
  price: number;
  giftCard: number;
  cash: number;
};

type AddTvInfo = {
  checked: boolean;
  count: string;
  setupBox: string;
};

type ProductStore = {
  carrier: string;
  internet: SelectedProduct | null;
  tv: SelectedProduct | null;
  phone: SelectedProduct | null;
  wifi: string;
  setupBox: string;
  phoneOption: string;
  phoneCarrier: string;
  phoneNumber: string;
  addTv: AddTvInfo;

  setCarrier: (carrier: string) => void;
  setInternet: (product: SelectedProduct | null) => void;
  setTv: (product: SelectedProduct | null) => void;
  setPhone: (product: SelectedProduct | null) => void;
  setWifi: (wifi: string) => void;
  setSetupBox: (setupBox: string) => void;
  setPhoneOption: (option: string) => void;
  setPhoneCarrier: (carrier: string) => void;
  setPhoneNumber: (number: string) => void;
  setAddTv: (addTv: AddTvInfo) => void;

  setProductInfo: (
    info: Omit<
      ProductStore,
      | "setCarrier"
      | "setInternet"
      | "setTv"
      | "setPhone"
      | "setWifi"
      | "setSetupBox"
      | "setPhoneOption"
      | "setPhoneCarrier"
      | "setPhoneNumber"
      | "setAddTv"
      | "setProductInfo"
    >
  ) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  carrier: "KT",
  internet: null,
  tv: null,
  phone: null,
  wifi: "",
  setupBox: "",
  phoneOption: "",
  phoneCarrier: "",
  phoneNumber: "",
  addTv: {
    checked: false,
    count: "",
    setupBox: "",
  },
  setCarrier: (carrier) => set({ carrier }),
  setInternet: (product) => set({ internet: product }),
  setTv: (product) => set({ tv: product }),
  setPhone: (product) => set({ phone: product }),
  setWifi: (wifi) => set({ wifi }),
  setSetupBox: (setupBox) => set({ setupBox }),
  setPhoneOption: (option) => set({ phoneOption: option }),
  setPhoneCarrier: (carrier) => set({ phoneCarrier: carrier }),
  setPhoneNumber: (number) => set({ phoneNumber: number }),
  setAddTv: (addTv) => set({ addTv }),

  setProductInfo: (info) =>
    set({
      carrier: info.carrier,
      internet: info.internet,
      tv: info.tv,
      phone: info.phone,
      wifi: info.wifi,
      setupBox: info.setupBox,
      phoneOption: info.phoneOption,
      phoneCarrier: info.phoneCarrier,
      phoneNumber: info.phoneNumber,
      addTv: info.addTv,
    }),
}));
