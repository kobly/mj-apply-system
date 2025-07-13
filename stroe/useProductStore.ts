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

type ApplyInfo = {
  custType: "개인" | "개인사업자" | "법인사업자";
  customerName: string;
  customerRRNFront: string;
  customerRRNBack: string;
  postcode: string;
  roadAddress: string;
  detailAddress: string;
  accountName: string;
  accountBank: string;
  accountNumber: string;
  cardName: string;
  cardNumber: string;
  cardExpire: string;
  giftAccountName: string;
  giftAccountRRN: string;
  giftAccountBank: string;
  giftAccountNumber: string;
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

  applyInfo: ApplyInfo;

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

  setApplyInfo: (info: ApplyInfo) => void;

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
      | "setApplyInfo"
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

  applyInfo: {
    custType: "개인",
    customerName: "",
    customerRRNFront: "",
    customerRRNBack: "",
    postcode: "",
    roadAddress: "",
    detailAddress: "",
    accountName: "",
    accountBank: "",
    accountNumber: "",
    cardName: "",
    cardNumber: "",
    cardExpire: "",
    giftAccountName: "",
    giftAccountRRN: "",
    giftAccountBank: "",
    giftAccountNumber: "",
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
  setApplyInfo: (info) => set({ applyInfo: info }),

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
