"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternetApplyForm() {
  const router = useRouter();

  const [custType, setCustType] = useState<
    "개인" | "개인사업자" | "법인사업자"
  >("개인");
  const [payType, setPayType] = useState<"card" | "bank" | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerRRN, setCustomerRRN] = useState("");

  const [accountName, setAccountName] = useState("");
  const [accountRRN, setAccountRRN] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [sameAsAutoPay, setSameAsAutoPay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/apply/internet/product");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6">
      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">고객 정보</h2>
        <div className="flex gap-4 items-center">
          {["개인", "개인사업자", "법인사업자"].map((type) => (
            <label key={type} className="flex gap-2">
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
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="고객명"
            className="input"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="주민번호"
            className="input"
            value={customerRRN}
            onChange={(e) => setCustomerRRN(e.target.value)}
          />
          <input type="text" placeholder="설치주소" className="input" />
          <input type="text" placeholder="상세주소" className="input" />
          <input type="text" placeholder="연락처" className="input" />
          <input type="email" placeholder="Email" className="input" />
        </div>
      </section>

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
              <option>카드사 선택</option>
              <option>삼성카드</option>
              <option>국민카드</option>
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
              <option>국민은행</option>
              <option>신한은행</option>
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
        <h2 className="text-lg font-semibold">사은품게좌</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsCustomer}
              onChange={(e) => setSameAsCustomer(e.target.checked)}
            />
            고객명과 동일
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="성함"
            className="input"
            value={sameAsCustomer ? customerName : accountName}
            disabled={sameAsCustomer}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <input
            type="text"
            placeholder="주민번호"
            className="input"
            value={sameAsCustomer ? customerRRN : accountRRN}
            disabled={sameAsCustomer}
            onChange={(e) => setAccountRRN(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsAutoPay}
              onChange={(e) => setSameAsAutoPay(e.target.checked)}
            />
            자동이체자와 동일
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="input"
            disabled={sameAsAutoPay}
            value={sameAsAutoPay ? accountBank : ""}
            onChange={() => {}}
          >
            <option>은행 선택</option>
            <option>국민은행</option>
            <option>신한은행</option>
          </select>
          <input
            type="text"
            placeholder="계좌번호"
            className="input"
            value={sameAsAutoPay ? accountNumber : ""}
            disabled={sameAsAutoPay}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="예금주"
            className="input"
            value={sameAsAutoPay ? accountName : ""}
            disabled={sameAsAutoPay}
            onChange={() => {}}
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
