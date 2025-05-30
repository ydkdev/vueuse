import { describe, expect, it } from 'vitest'
import { ref as deepRef, shallowRef } from 'vue'
import { useArrayJoin } from './index'

describe('useArrayJoin', () => {
  it('should be defined', () => {
    expect(useArrayJoin).toBeDefined()
  })

  it('should work with array of refs', () => {
    const item1 = shallowRef('foo')
    const item2 = shallowRef(0)
    const item3 = deepRef({ prop: 'val' })
    const list = [item1, item2, item3]
    const result = useArrayJoin(list)
    expect(result.value).toBe('foo,0,[object Object]')
    item1.value = 'bar'
    expect(result.value).toBe('bar,0,[object Object]')
  })

  it('should work with reactive array', () => {
    const list = deepRef(['string', 0, { prop: 'val' }, false, [1], [[2]], null, undefined, []])
    const result = useArrayJoin(list)
    expect(result.value).toBe('string,0,[object Object],false,1,2,,,')
    list.value.push(true)
    expect(result.value).toBe('string,0,[object Object],false,1,2,,,,true')
    list.value = [null, 'string', undefined, 0, [], [1], [[2]], { prop: 'val' }]
    expect(result.value).toBe(',string,,0,,1,2,[object Object]')
  })

  it('should work with reactive separator', () => {
    const list = deepRef(['string', 0, { prop: 'val' }, [1], [[2]], null, undefined, []])
    const separator = deepRef()
    const result = useArrayJoin(list, separator)
    expect(result.value).toBe('string,0,[object Object],1,2,,,')
    separator.value = ''
    expect(result.value).toBe('string0[object Object]12')
    separator.value = '-'
    expect(result.value).toBe('string-0-[object Object]-1-2---')
  })
})
