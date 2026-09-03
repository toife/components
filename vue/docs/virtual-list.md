# Virtual List (`t-virtual-list`)

## Mô tả

Danh sách windowed: chỉ render các item đang nằm trong viewport (cộng `overscan`). Component **không sở hữu overflow** — nó sống bên trong một scrollport, thường là `t-scrollbar`.

Root là spacer có chiều cao (hoặc rộng) bằng tổng kích thước mọi item, nên cha vẫn thấy đủ document để vẽ thumb. Item visible được đặt `position: absolute` dọc theo spacer đó. Cuộn native, momentum, wheel và bàn phím vẫn thuộc về ancestor.

## Ví dụ sử dụng

```vue
<template>
  <div style="height: 400px">
    <t-scrollbar>
      <t-virtual-list :items="rows" item-key="id" :estimate="48" @visible="onVisible">
        <template #item="{ item, index }">
          <div>{{ index + 1 }}. {{ item.title }}</div>
        </template>
      </t-virtual-list>
    </t-scrollbar>
  </div>
</template>
```

Phần tử cha của `t-scrollbar` phải có chiều cao xác định. Không bọc `t-virtual-list` trong một wrapper `overflow` khác trừ khi wrapper đó chính là scrollport. Đừng dùng `margin` trên root của item — dùng prop `gap`.

## Props

| Prop | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `items` | `unknown[]` | — | Mảng dữ liệu. Không truyền thì coi như rỗng |
| `estimate` | `number` | `48` | Chiều cao (hoặc rộng) ước lượng của một item, px. Dùng cho item chưa đo |
| `overscan` | `number` | `4` | Số item render thêm phía trước và phía sau viewport |
| `gap` | `number` | `0` | Khoảng cách giữa các item, px — không thêm sau item cuối |
| `direction` | `"vertical"` hoặc `"horizontal"` | `"vertical"` | Trục ảo hóa. Khớp `direction` của `t-scrollbar` khi cuộn ngang |
| `measure` | `boolean` | `true` | Đo item đã render và nhớ size. Tắt khi mọi hàng đúng bằng `estimate` |
| `itemKey` | `string` hoặc `(item, index) => PropertyKey` | index | Key của `v-for`. Chuỗi thì lấy field trên object |

## Slots

- **`item`** — `{ item, index }`. Bắt buộc. Mỗi lần gọi là một hàng trong cửa sổ hiện tại.

## Events (emit)

- **`visible`** — `{ start, end }` (`end` exclusive). Phát khi cửa sổ đổi.

## Expose

| Tên | Kiểu | Mô tả |
|-----|------|-------|
| `scrollport` | `Ref<HTMLElement \| null>` | Ancestor đang cuộn |
| `scrollToIndex` | `(index: number, align?: 'start' \| 'center' \| 'end' \| 'auto') => void` | Cuộn tới item |
| `scrollToOffset` | `(offset: number) => void` | Cuộn tới offset px |
| `update` | `() => void` | Tính lại cửa sổ khi có thay đổi không observer nào thấy |
| `range` | `VirtualListWindow` | `start`, `end`, `offset`, `size` hiện tại |

## Provider / Inject

Không provide / inject. Scrollport được tìm bằng cách đi lên ancestor có `overflow: auto \| scroll`.
