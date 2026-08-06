# Scrollbar (`t-scrollbar`)

## Mô tả

Vùng cuộn có thanh scroll ảo vẽ đè lên nội dung, thay cho thanh scroll mặc định của trình duyệt.

Component **bọc lấy nội dung**: slot cuộn thật bên trong `.t-scrollbar-content`, còn track là phần tử anh em được đặt tuyệt đối bên trên. Nhờ tự sở hữu vùng cuộn nên track được CSS đặt vị trí ngay trong chính cái box đang cuộn — không phải đo đạc theo từng frame, và không ancestor nào đẩy nó ra ngoài được.

Kéo thanh scroll ghi ngược lại `scrollTop` / `scrollLeft`, nên trình duyệt vẫn giữ quyền xử lý quán tính, con lăn và bàn phím.

Wrapper lấp đầy phần tử cha, nên cha phải có chiều cao xác định — như mọi vùng cuộn khác.

## Ví dụ sử dụng

```vue
<template>
  <div style="height: 400px">
    <t-scrollbar direction="both" :size="12" @scroll="onScroll">
      <article class="padding-4">...</article>
    </t-scrollbar>
  </div>
</template>
```

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `direction` | `"vertical"` hoặc `"horizontal"` hoặc `"both"` | `"vertical"` | Trục được vẽ thanh scroll |
| `size` | `number` | `10` | Bề rộng rãnh (px) — vùng bắt chuột của track |
| `thumbSize` | `number` | `6` | Bề rộng thumb (px), căn giữa trong rãnh |
| `minThumb` | `number` | `24` | Chiều dài tối thiểu của thumb khi nội dung rất dài |
| `autoHide` | `boolean` | `true` | Mờ dần khi không thao tác |
| `hideDelay` | `number` | `500` | Thời gian chờ (ms) trước khi mờ đi sau khi cuộn |
| `role` | `string` | `""` | Role của layer `t-layer-scrollbar` |

## Events (emit)

- **`scroll`** — `Event` (sự kiện `scroll` không bubble nên wrapper phải phát lại)

## Expose

| Tên | Kiểu | Mô tả |
|-----|------|-------|
| `scrollport` | `Ref<HTMLElement \| null>` | Phần tử cuộn thật |
| `update` | `() => void` | Đo lại khi có thay đổi không observer nào thấy được |
| `metrics` | `ScrollbarMetrics` | Kích thước/vị trí cuộn hiện tại |

## Provider / Inject

### Inject

`APP_PROVIDER_STATE_KEY` — dùng `role` khi prop `role` để trống.

## Tuỳ biến style

Ngoài layer `t-layer-scrollbar`, có thể ghi đè riêng màu thumb bằng CSS custom property:

| Property | Mặc định |
|----------|----------|
| `--t-scrollbar-thumb-color` | `rgba(var(--t-color), 0.1)` |
| `--t-scrollbar-thumb-color-hover` | `rgba(var(--t-color), 0.15)` |
| `--t-scrollbar-thumb-color-active` | `rgba(var(--t-color), 0.2)` |

Các property còn lại (`--t-scrollbar-size`, `--t-scrollbar-thumb-size`, `--t-scrollbar-thumb-inset`, `--t-scrollbar-thumb-radius`, `--t-scrollbar-inset`, `--t-scrollbar-thumb-length`, `--t-scrollbar-thumb-offset`) do component tự ghi từ props và hình học đo được — không nên đặt tay.
