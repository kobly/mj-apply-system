"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternetApplyForm() {
  const [isCorp, setIsCorp] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/apply/internet/product");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6">
      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">고객 정보</h2>
        <div className="flex gap-4 items-center">
          <label className="flex gap-2">
            <input type="radio" name="custType" /> 개인
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="custType"
              onChange={() => setIsCorp(true)}
            />{" "}
            법인
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="고객명" className="input" />
          <input type="text" placeholder="주민번호" className="input" />
          <input type="text" placeholder="설치주소" className="input" />
          <input type="text" placeholder="상세주소" className="input" />
          <input type="text" placeholder="연락처" className="input" />
          <input type="email" placeholder="Email" className="input" />
        </div>
      </section>

      {isCorp && (
        <section className="space-y-4 border p-4 rounded-md">
          <h2 className="text-lg font-semibold">법인 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="상호명" className="input" />
            <input type="text" placeholder="법인등록번호" className="input" />
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

      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">자동이체 정보</h2>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="paytype" /> 카드
          </label>
          <label>
            <input type="radio" name="paytype" /> 은행
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select className="input">
            <option>은행 선택</option>
          </select>
          <input type="text" placeholder="계좌번호" className="input" />
          <input type="text" placeholder="유효기간" className="input" />
        </div>
      </section>

      <section className="space-y-4 border p-4 rounded-md">
        <h2 className="text-lg font-semibold">예금주 / 세금계산서 정보</h2>
        <div className="flex gap-4">
          <label>
            <input type="checkbox" /> 고객명과 동일
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="성함" className="input" />
          <input type="text" placeholder="주민번호" className="input" />
        </div>
        <div className="flex gap-4">
          <label>
            <input type="checkbox" /> 자동이체자와 동일
          </label>
          <label>
            <input type="checkbox" /> 고객명과 동일
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select className="input">
            <option>은행 선택</option>
          </select>
          <input type="text" placeholder="계좌번호" className="input" />
          <input type="text" placeholder="예금주" className="input" />
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
