type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  status: UploadStatus;
  name: string;
  response?: Record<string, any>,
  raw: File;
}
