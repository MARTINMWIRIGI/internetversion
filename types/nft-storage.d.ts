declare module 'nft.storage' {
  export class NFTStorage {
    constructor(options: { token: string })
    store(metadata: any): Promise<{ url: string }>
  }
  
  export class File {
    constructor(content: BlobPart[], filename: string, options?: { type: string })
  }
}