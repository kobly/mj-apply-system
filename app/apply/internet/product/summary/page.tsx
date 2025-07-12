"use client";

import { useProductStore } from "@/stroe/useProductStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductSummaryPage() {
  const router = useRouter();
  const {
    carrier,
    internet,
    tv,
    phone,
    wifi,
    setupBox,
    phoneOption,
    phoneCarrier,
    phoneNumber,
    addTv,
  } = useProductStore();

  const [agreeTerms, setAgreeTerms] = useState({
    term1: false,
    term2: false,
  });

  const [showFee, setShowFee] = useState(false);

  const allAgreed = agreeTerms.term1 && agreeTerms.term2;

  const monthlyPrice =
    (internet?.price ?? 0) + (tv?.price ?? 0) + (phone?.price ?? 0);

  const totalGiftCard =
    (internet?.giftCard ?? 0) + (tv?.giftCard ?? 0) + (phone?.giftCard ?? 0);

  const totalCash =
    (internet?.cash ?? 0) + (tv?.cash ?? 0) + (phone?.cash ?? 0);

  const installFee = 56280;

  const store = useProductStore();
  useEffect(() => {
    console.log("상품 저장 상태 확인:", store);
  }, []);

  const handleSubmit = () => {
    if (!allAgreed) return; // 혹시 몰라 한 번 더 확인

    alert("신청이 완료되었습니다!");
    // router.push("/apply/complete"); // 완료 페이지 이동 등
  };

  return (
    <section className="p-6 border rounded space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">📦 선택 상품 요약</h2>

      <div className="space-y-2">
        <p>
          <strong>통신사:</strong> {carrier}
        </p>
        {internet && (
          <p>
            <strong>인터넷 상품:</strong> {internet.name} (
            {internet.price.toLocaleString()}원)
          </p>
        )}
        {tv && (
          <p>
            <strong>인터넷 + TV:</strong> {tv.name} ({tv.price.toLocaleString()}
            원)
          </p>
        )}
        {phone && (
          <p>
            <strong>전화 상품:</strong> {phone.name} (
            {phone.price.toLocaleString()}원)
          </p>
        )}
        {wifi && (
          <p>
            <strong>와이파이:</strong> {wifi}
          </p>
        )}
        {setupBox && (
          <p>
            <strong>셋탑박스:</strong> {setupBox}
          </p>
        )}
        {phoneOption && (
          <p>
            <strong>전화 옵션:</strong> {phoneOption}
            {phoneOption === "번호이동" && phoneCarrier && phoneNumber && (
              <>
                {" "}
                / {phoneCarrier} / {phoneNumber}
              </>
            )}
          </p>
        )}
      </div>
      <div className="border p-4 rounded bg-gray-50 space-y-2">
        <p className="text-lg font-bold">💳 요금 및 혜택 요약</p>
        <ul className="list-disc list-inside text-sm">
          <li>
            월 요금: <strong>{monthlyPrice.toLocaleString()}원</strong>
          </li>
          <li>
            설치비: <strong>{installFee.toLocaleString()}원</strong>
          </li>
          <li>
            상품권: <strong>{totalGiftCard.toLocaleString()}원</strong>
          </li>
          <li>
            고객 현금: <strong>{totalCash.toLocaleString()}원</strong>
          </li>
        </ul>
      </div>

      <div className="text-right">
        <button
          className="text-blue-600 underline text-sm"
          onClick={() => setShowFee((prev) => !prev)}
        >
          {showFee ? "숨기기" : "총 수수료 확인"}
        </button>
      </div>

      {showFee && (
        <div className="border p-4 rounded bg-gray-50 space-y-2">
          <p className="text-lg font-bold">
            💰 총 수수료:{" "}
            <span className="text-red-500 font-bold">750,000원</span>
          </p>
          <ul className="list-disc list-inside text-sm">
            <li>
              사은품 엠지에 지급 시 최종 수령료: <strong>310,000원</strong>
            </li>
            <li>
              사은품 한빛통신에서 지급 시 최종 수령료:{" "}
              <strong>750,000원</strong>
            </li>
          </ul>
        </div>
      )}

      <div className="border-t pt-4 space-y-2 text-sm">
        <p className="font-semibold text-red-600">⚠ 주의사항</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreeTerms.term1}
              onChange={() =>
                setAgreeTerms((prev) => ({ ...prev, term1: !prev.term1 }))
              }
              className="mt-1"
            />
            <span>
              약정은 3년이며, 약정기간 내 해지 시 위약금이 발생하는 것에
              동의합니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreeTerms.term2}
              onChange={() =>
                setAgreeTerms((prev) => ({ ...prev, term2: !prev.term2 }))
              }
              className="mt-1"
            />
            <span>
              실사용일수 1년 이내에 상품 변경, 해지, 정지, 복지할인, 동일(가족)
              명의의 KT 인터넷 해지 시 <br />
              지급 받은 현금을 전액 반환하는 것에 동의합니다.
            </span>
          </li>
        </ul>
      </div>

      {addTv.checked && (
        <div className="border-t pt-4 space-y-2 text-sm">
          <p className="font-semibold">📺 추가 TV</p>
          <p>
            대수: {addTv.count} / 셋탑박스: {addTv.setupBox}
          </p>
        </div>
      )}

      <div className="border-t pt-4 text-sm">
        <p className="font-semibold">📝 서류 첨부 (해당 시)</p>
        <div className="flex gap-4 mt-2">
          <div className="border p-2 w-24 h-16 flex items-center justify-center">
            사업자등록증
          </div>
          <div className="border p-2 w-24 h-16 flex items-center justify-center">
            대표자
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.back()}
          className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100"
        >
          ◀ 뒤로
        </button>

        <button
          onClick={handleSubmit}
          disabled={!allAgreed}
          className={`px-6 py-2 rounded text-sm text-white ${
            allAgreed
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          신청하기
        </button>
      </div>
    </section>
  );
}
