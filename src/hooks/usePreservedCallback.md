## usePreservedCallback
콜백 함수의 참조를 유지하는 훅

### Usage
- 콜백이 매번 새로 생성되어 의존성 배열이 불필요하게 변경되는 문제 방지
```typescript
const callback = usePreservedCallback(() => {
    console.log('preserve callback');
})

useEffect(() => {
    // Effect는 한번만 호출된다
    callback();
}, [callback])
```
