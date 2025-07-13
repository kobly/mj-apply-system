"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { banks } from "@/data/banks";
import { cards } from "@/data/cards";
import { carriers } from "@/data/carriers";
export default function InternetApplyForm() {
  const router = useRouter();

  const [custType, setCustType] = useState<
    "개인" | "개인사업자" | "법인사업자"
  >("개인");
  const [payType, setPayType] = useState<"card" | "bank" | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerRRNFront, setCustomerRRNFront] = useState("");
  const [customerRRNBack, setCustomerRRNBack] = useState("");

  const [accountName, setAccountName] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [giftAccountName, setGiftAccountName] = useState("");

  const [giftAccountRRN, setGiftAccountRRN] = useState("");
  const [giftAccountBank, setGiftAccountBank] = useState("");
  const [giftAccountNumber, setGiftAccountNumber] = useState("");

  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [sameAsAutoPay, setSameAsAutoPay] = useState(false);

  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setPostcode(data.zonecode);
        setRoadAddress(data.roadAddress);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (sameAsCustomer) {
      setGiftAccountName(customerName);
      setGiftAccountRRN(`${customerRRNFront}${customerRRNBack}`);
    } else if (sameAsAutoPay) {
      setGiftAccountName(accountName);
      setGiftAccountBank(accountBank);
      setGiftAccountNumber(accountNumber);
    }
  }, [
    sameAsCustomer,
    sameAsAutoPay,
    customerName,
    customerRRNFront,
    customerRRNBack,
    accountName,
    accountBank,
    accountNumber,
  ]);

  const handleSameAsCustomer = (checked: boolean) => {
    setSameAsCustomer(checked);
    if (checked) setSameAsAutoPay(false);
  };

  const handleSameAsAutoPay = (checked: boolean) => {
    setSameAsAutoPay(checked);
    if (checked) setSameAsCustomer(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/apply/internet/product");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 w-1/2 m-auto">
      <div className="flex gap-4">
        {["개인", "개인사업자", "법인사업자"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="radio"
              name="custType"
              checked={custType === type}
              onChange={() => setCustType(type as any)}
            />
            {type}
          </label>
        ))}
      </div>

      {custType === "개인" && (
        <section className="border p-6 rounded space-y-4">
          <h2 className="text-lg font-semibold">개인 고객 정보</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="고객명"
              className="input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="주민번호 앞자리"
                pattern="\d{6}"
                maxLength={6}
                className="input"
                value={customerRRNFront}
                onChange={(e) => setCustomerRRNFront(e.target.value)}
              />
              <input
                type="password"
                placeholder="주민번호 뒷자리"
                pattern="\d{7}"
                maxLength={7}
                inputMode="numeric"
                className="input"
                value={customerRRNBack}
                onChange={(e) => setCustomerRRNBack(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 col-span-2">
              <input
                type="text"
                placeholder="우편번호"
                className="input"
                value={postcode}
                readOnly
              />
              <button
                type="button"
                onClick={openPostcode}
                className="bg-gray-200 rounded px-4 text-sm"
              >
                주소 검색
              </button>
            </div>

            <input
              type="text"
              placeholder="도로명 주소"
              className="input col-span-2"
              value={roadAddress}
              readOnly
            />

            <input
              type="text"
              placeholder="상세주소"
              className="input col-span-2"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />

            <select className="input">
              <option>통신사 선택</option>
              {carriers.map((carrier) => (
                <option key={carrier} value={carrier}>
                  {carrier}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="휴대폰번호"
              className="input"
              pattern="\d{10,11}"
              maxLength={11}
            />

            <input
              type="email"
              placeholder="Email"
              className="input col-span-2"
            />
          </div>

          <p className="text-sm text-red-500">※ 본인 명의 휴대폰 아니면 불가</p>
        </section>
      )}
      {custType === "개인사업자" && (
        <section className="border p-4 rounded space-y-4">
          <h2 className="text-lg font-semibold">개인사업자 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="상호명" className="input" />
            <input type="text" placeholder="대표자 성함" className="input" />
            <input type="text" placeholder="주민번호" className="input" />
            <input type="text" placeholder="사업자번호" className="input" />
            <input type="text" placeholder="설치주소" className="input" />
            <input type="text" placeholder="상세주소" className="input" />
            <input type="text" placeholder="연락처" className="input" />
            <input type="email" placeholder="Email" className="input" />
          </div>
        </section>
      )}

      {custType === "법인사업자" && (
        <section className="border p-4 rounded space-y-4">
          <h2 className="text-lg font-semibold">법인사업자 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="상호명" className="input" />
            <input type="text" placeholder="법인등록번호" className="input" />
            <input type="text" placeholder="대표자 성함" className="input" />
            <input
              type="text"
              placeholder="대표자 주민번호"
              className="input"
            />
            <input type="text" placeholder="사업자번호" className="input" />
            <input type="text" placeholder="설치주소" className="input" />
            <input type="text" placeholder="상세주소" className="input" />
            <input type="text" placeholder="연락처" className="input" />
            <input type="email" placeholder="Email" className="input" />
          </div>
        </section>
      )}

      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">자동이체 정보</h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paytype"
              checked={payType === "card"}
              onChange={() => setPayType("card")}
            />
            카드
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paytype"
              checked={payType === "bank"}
              onChange={() => setPayType("bank")}
            />
            은행
          </label>
        </div>

        {payType === "card" && (
          <div className="grid grid-cols-2 gap-4">
            <select className="input">
              <option value="">카드 선택</option>

              {cards.map((card) => (
                <option key={card} value={card}>
                  {card}
                </option>
              ))}
            </select>
            <input type="text" placeholder="카드번호" className="input" />
            <input
              type="text"
              placeholder="유효기간 (MM/YY)"
              className="input"
            />
          </div>
        )}

        {payType === "bank" && (
          <div className="grid grid-cols-2 gap-4">
            <select
              className="input"
              value={accountBank}
              onChange={(e) => setAccountBank(e.target.value)}
            >
              <option>은행 선택</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="계좌번호"
              className="input"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="예금주 성함"
              className="input"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        )}
      </section>

      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">사은품계좌</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsCustomer}
              onChange={(e) => handleSameAsCustomer(e.target.checked)}
            />
            고객명과 동일
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="성함"
            className="input"
            value={giftAccountName}
            onChange={(e) => setCustomerName(e.target.value)}
            readOnly={sameAsCustomer}
          />
          <input
            type="text"
            placeholder="주민번호"
            className="input"
            value={giftAccountRRN}
            onChange={(e) => setGiftAccountRRN(e.target.value)}
            readOnly={sameAsCustomer}
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsAutoPay}
              onChange={(e) => handleSameAsAutoPay(e.target.checked)}
            />
            자동이체자와 동일
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="input"
            value={giftAccountBank}
            onChange={(e) => setGiftAccountBank(e.target.value)}
            disabled={sameAsAutoPay}
          >
            <option>은행 선택</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="계좌번호"
            className="input"
            value={giftAccountNumber}
            onChange={(e) => setGiftAccountNumber(e.target.value)}
            readOnly={sameAsAutoPay}
          />
          <input
            type="text"
            placeholder="예금주"
            className="input"
            value={giftAccountName}
            onChange={(e) => setGiftAccountName(e.target.value)}
            readOnly={sameAsAutoPay}
          />
        </div>
      </section>

      <div className="text-right">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded"
        >
          다음
        </button>
      </div>
    </form>
  );
}
