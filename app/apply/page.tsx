"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const isAdmin = true;
  const imageUrl = "/promotion-demo.jpg";

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4 text-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary hover:underline transition"
          >
            처음으로
          </Link>
        </div>
        <span className="text-primary font-semibold">📞 1522-8580</span>
        <span className="text-xs text-gray-400">카카오톡</span>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <div>
          판매점명: <span className="font-medium text-black">행복통신</span>
        </div>
        <div>
          판매자: <span className="font-medium text-black">임혜성</span>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border">
        <Image
          src={imageUrl}
          alt="프로모션 배너"
          width={800}
          height={200}
          className="w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Button className="w-full h-20 text-base">인터넷 접수</Button>
        <Button className="w-full h-20 text-base">렌탈 접수</Button>
        <Button className="w-full h-20 text-base">CCTV 접수</Button>
        <Button className="w-full h-20 text-base">유심 접수</Button>
        <Button className="w-full h-20 text-base">접수현황</Button>
        {isAdmin && (
          <Button variant="secondary" className="w-full h-20 text-base">
            정책 등록
          </Button>
        )}
      </div>
    </main>
  );
}
