"use client";

import { useState } from "react";
import { internetProducts } from "@/data/internetProducts";
import { internetTvProducts } from "@/data/internetTvProducts";
import { phoneProducts } from "@/data/phoneProducts";
import { addTvProducts } from "@/data/addTvProduct";
import { useProductStore } from "@/stroe/useProductStore";
import { useRouter } from "next/navigation";

const carriers = [
  "KT",
  "SK",
  "LG",
  "스카이",
  "POP",
  "헬로",
  "LG헬로",
  "SK브로드밴드",
  "기업용",
];

export default function InternetProductTable() {
  const [selectedCarrier, setSelectedCarrier] = useState("KT");
  const [selectedInternetId, setSelectedInternetId] = useState<string | null>(
    null
  );
  const [selectedTvId, setSelectedTvId] = useState<string | null>(null);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);

  const [wifi, setWifi] = useState("");
  const [setupBox, setSetupBox] = useState("");
  const [phoneOption, setPhoneOption] = useState("");
  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [addTvChecked, setAddTvChecked] = useState(false);
  const [addTvCount, setAddTvCount] = useState("");
  const [addTvSetupBox, setAddTvSetupBox] = useState("");

  const { setProductInfo } = useProductStore();
  const applyInfo = useProductStore((state) => state.applyInfo);
  console.log(applyInfo);
  const router = useRouter();

  const handleNext = () => {
    const selectedInternet =
      internetProducts.find((p) => String(p.id) === selectedInternetId) ?? null;

    const selectedTv =
      internetTvProducts.find((p) => String(p.id) === selectedTvId) ?? null;

    const selectedPhone =
      phoneProducts.find((p) => String(p.id) === selectedPhoneId) ?? null;

    setProductInfo({
      carrier: selectedCarrier,
      internet: selectedInternet,
      tv: selectedTv,
      phone: selectedPhone,
      wifi,
      setupBox,
      phoneOption,
      phoneCarrier,
      phoneNumber,
      addTv: {
        checked: addTvChecked,
        count: addTvCount,
        setupBox: addTvSetupBox,
      },
      applyInfo: useProductStore.getState().applyInfo,
    });

    router.push("/apply/internet/product/summary");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="space-y-4 border p-4 rounded-md w-full max-w-xl bg-white shadow">
        <h2 className="text-lg font-semibold">통신사 선택</h2>
        <div className="flex flex-wrap gap-4">
          {carriers.map((carrier) => (
            <label key={carrier} className="flex items-center gap-1">
              <input
                type="radio"
                name="carrier"
                value={carrier}
                checked={selectedCarrier === carrier}
                onChange={() => setSelectedCarrier(carrier)}
              />
              {carrier}
            </label>
          ))}
        </div>

        <h2 className="text-lg font-semibold">인터넷 상품 선택</h2>
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">선택</th>
              <th className="border p-2">인터넷</th>
              <th className="border p-2">월 요금</th>
              <th className="border p-2">상품권</th>
              <th className="border p-2">현금</th>
            </tr>
          </thead>
          <tbody>
            {internetProducts.map((item) => (
              <tr
                key={item.id}
                className={
                  selectedInternetId === item.id ? "bg-yellow-100" : ""
                }
              >
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedInternetId === item.id}
                    onChange={() =>
                      setSelectedInternetId(
                        selectedInternetId === item.id ? null : item.id
                      )
                    }
                  />
                </td>
                <td className="border p-2 text-center">{item.name}</td>
                <td className="border p-2 text-center">
                  {item.price.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.giftCard.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.cash.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedInternetId && (
          <div className="space-y-4">
            <h3 className="font-medium">와이파이 선택</h3>
            <label className="mr-4">
              <input
                type="radio"
                name="wifi"
                value="신청"
                checked={wifi === "신청"}
                onChange={(e) => setWifi(e.target.value)}
              />{" "}
              신청 (월요금 1,100원 증가, 1G는 면제)
            </label>
            <label>
              <input
                type="radio"
                name="wifi"
                value="미신청"
                checked={wifi === "미신청"}
                onChange={(e) => setWifi(e.target.value)}
              />{" "}
              미신청
            </label>
          </div>
        )}

        <h2 className="text-lg font-semibold">인터넷 + TV 상품 선택</h2>
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">선택</th>
              <th className="border p-2">상품명</th>
              <th className="border p-2">월 요금</th>
              <th className="border p-2">상품권</th>
              <th className="border p-2">현금</th>
            </tr>
          </thead>
          <tbody>
            {internetTvProducts.map((item) => (
              <tr
                key={item.id}
                className={selectedTvId === item.id ? "bg-yellow-100" : ""}
              >
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedTvId === item.id}
                    onChange={() =>
                      setSelectedTvId(selectedTvId === item.id ? null : item.id)
                    }
                  />
                </td>
                <td className="border p-2 text-center">{item.name}</td>
                <td className="border p-2 text-center">
                  {item.price.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.giftCard.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.cash.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTvId && (
          <div className="space-y-4">
            <h3 className="font-medium">와이파이 선택</h3>
            <label className="mr-4">
              <input
                type="radio"
                name="tv-wifi"
                value="신청"
                checked={wifi === "신청"}
                onChange={(e) => setWifi(e.target.value)}
              />{" "}
              신청 (월요금 1,100원 증가, 1G는 면제)
            </label>
            <label>
              <input
                type="radio"
                name="tv-wifi"
                value="미신청"
                checked={wifi === "미신청"}
                onChange={(e) => setWifi(e.target.value)}
              />{" "}
              미신청
            </label>

            <h3 className="font-medium mt-4">셋탑박스 선택</h3>
            <select
              className="border px-2 py-1 rounded mt-1"
              value={setupBox}
              onChange={(e) => setSetupBox(e.target.value)}
            >
              <option value="">선택</option>
              <option value="기가지니3">기가지니3</option>
              <option value="기가지니A">기가지니A (1100원↓, 현금 3만↓)</option>
              <option value="사운드바">사운드바 (월요금 2200원↑)</option>
            </select>
          </div>
        )}

        <h2 className="text-lg font-semibold">전화 상품 선택</h2>
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">선택</th>
              <th className="border p-2">상품명</th>
              <th className="border p-2">월 요금</th>
              <th className="border p-2">상품권</th>
              <th className="border p-2">현금</th>
            </tr>
          </thead>
          <tbody>
            {phoneProducts.map((item) => (
              <tr
                key={item.id}
                className={selectedPhoneId === item.id ? "bg-yellow-100" : ""}
              >
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedPhoneId === item.id}
                    onChange={() =>
                      setSelectedPhoneId(
                        selectedPhoneId === item.id ? null : item.id
                      )
                    }
                  />
                </td>
                <td className="border p-2 text-center">{item.name}</td>
                <td className="border p-2 text-center">
                  {item.price.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.giftCard.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.cash.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPhoneId && (
          <div className="space-y-4">
            <h3 className="font-medium">전화 옵션</h3>
            <label className="mr-4">
              <input
                type="radio"
                name="phoneOption"
                value="신규"
                checked={phoneOption === "신규"}
                onChange={(e) => setPhoneOption(e.target.value)}
              />{" "}
              신규 (희망번호 뒷 4자리)
            </label>
            <label>
              <input
                type="radio"
                name="phoneOption"
                value="번호이동"
                checked={phoneOption === "번호이동"}
                onChange={(e) => setPhoneOption(e.target.value)}
              />{" "}
              번호이동
            </label>

            {phoneOption === "번호이동" && (
              <div className="mt-2 space-y-2">
                <label className="block">
                  통신사:
                  <select
                    className="ml-2 border px-2 py-1 rounded"
                    value={phoneCarrier}
                    onChange={(e) => setPhoneCarrier(e.target.value)}
                  >
                    <option value="">선택</option>
                    <option value="KT">KT</option>
                    <option value="SK">SK</option>
                    <option value="LG">LG</option>
                  </select>
                </label>
                <label className="block">
                  기존 번호:
                  <input
                    type="text"
                    className="ml-2 border px-2 py-1 rounded"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="010-1234-5678"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        <h2 className="text-lg font-semibold">추가 TV 상품</h2>
        <table className="w-full table-auto border-collapse text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">선택</th>
              <th className="border p-2">추가 TV 상품명</th>
              <th className="border p-2">월 요금</th>
              <th className="border p-2">상품권</th>
              <th className="border p-2">현금</th>
            </tr>
          </thead>
          <tbody>
            {addTvProducts.map((item) => (
              <tr key={item.id} className={addTvChecked ? "bg-yellow-100" : ""}>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={addTvChecked}
                    onChange={() => setAddTvChecked(!addTvChecked)}
                  />
                </td>
                <td className="border p-2 text-center">{item.name}</td>
                <td className="border p-2 text-center">
                  {item.price.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.giftCard.toLocaleString()}원
                </td>
                <td className="border p-2 text-center">
                  {item.cash.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {addTvChecked && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">필요 대수</h3>
              <select
                className="border px-2 py-1 rounded"
                value={addTvCount}
                onChange={(e) => setAddTvCount(e.target.value)}
              >
                <option value="">선택</option>
                <option value="1대">1대</option>
                <option value="2대">2대</option>
                <option value="3대">3대</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium">셋탑박스 선택</h3>
              <select
                className="border px-2 py-1 rounded"
                value={addTvSetupBox}
                onChange={(e) => setAddTvSetupBox(e.target.value)}
              >
                <option value="">선택</option>
                <option value="기가지니A">기가지니A</option>
                <option value="기가지니3">
                  기가지니3 (월 1100원↑, 현금 3만원↑)
                </option>
              </select>
            </div>
          </div>
        )}

        <div className="text-right">
          <button
            onClick={handleNext}
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded"
          >
            다음
          </button>
        </div>
      </section>
    </div>
  );
}
