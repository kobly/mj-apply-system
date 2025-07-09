"use client";

import { useState } from "react";
import { internetProducts } from "@/data/internetProducts";
import { internetTvProducts } from "@/data/internetTvProducts";
import { phoneProducts } from "@/data/phoneProducts";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "internet" | "tv" | "phone" | null
  >(null);

  const [wifi, setWifi] = useState("");
  const [setupBox, setSetupBox] = useState("");
  const [phoneOption, setPhoneOption] = useState("");
  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSelect = (id: string, category: typeof selectedCategory) => {
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedCategory(null);
    } else {
      setSelectedId(id);
      setSelectedCategory(category);
    }
  };

  return (
    <section className="space-y-4 border p-4 rounded-md">
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
              className={selectedId === item.id ? "bg-yellow-100" : ""}
            >
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => handleSelect(item.id, "internet")}
                />
              </td>
              <td className="border p-2 text-center">{item.name}</td>
              <td className="border p-2 text-center">
                {item.price.toLocaleString()}원
              </td>
              <td className="border p-2 text-center">{item.giftCard}</td>
              <td className="border p-2 text-center">{item.cash}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          {internetTvProducts.map((item) => (
            <tr
              key={item.id}
              className={selectedId === item.id ? "bg-yellow-100" : ""}
            >
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => handleSelect(item.id, "tv")}
                />
              </td>
              <td className="border p-2 text-center">{item.name}</td>
              <td className="border p-2 text-center">
                {item.price.toLocaleString()}원
              </td>
              <td className="border p-2 text-center">{item.giftCard}</td>
              <td className="border p-2 text-center">{item.cash}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          {phoneProducts.map((item) => (
            <tr
              key={item.id}
              className={selectedId === item.id ? "bg-yellow-100" : ""}
            >
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => handleSelect(item.id, "phone")}
                />
              </td>
              <td className="border p-2 text-center">{item.name}</td>
              <td className="border p-2 text-center">
                {item.price.toLocaleString()}원
              </td>
              <td className="border p-2 text-center">{item.giftCard}</td>
              <td className="border p-2 text-center">{item.cash}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedId && (
        <div className="space-y-4 border-t pt-4 mt-4">
          {selectedCategory === "internet" && (
            <>
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
            </>
          )}

          {selectedCategory === "tv" && (
            <>
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

              <h3 className="font-medium mt-4">셋탑박스 선택</h3>
              <select
                className="border px-2 py-1 rounded mt-1"
                value={setupBox}
                onChange={(e) => setSetupBox(e.target.value)}
              >
                <option value="">선택</option>
                <option value="기가지니3">기가지니3</option>
                <option value="기가지니A">
                  기가지니A (1100원↓, 현금 3만↓)
                </option>
                <option value="사운드바">사운드바 (월요금 2200원↑)</option>
              </select>
            </>
          )}

          {selectedCategory === "phone" && (
            <>
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
            </>
          )}
        </div>
      )}

      <div className="text-right">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded"
        >
          다음
        </button>
      </div>
    </section>
  );
}
