## useClickOutside

요소 외부를 클릭했을 때 이벤트 감지하는 훅

### Usage

- 모달, 드롭다운 등 외부 클릭으로 닫아야하는 UI의 공통 로직

```typescript
const ref = useRef<HTMLDivElement>(null);
const [isOpen, setIsOpen] = useState(false);
useClickOutside(ref, () => setIsOpen(false));

return (
    <div ref={ref}>
      {'somethine...'}
    </div>
)
```
