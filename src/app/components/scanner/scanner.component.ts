import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-scanner',
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css',
})
export class ScannerComponent {
  qrResult: string | null = null;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined = undefined;
  hasTorch = false;
  torchEnabled = false;

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  onCodeResult(result: string) {
    this.qrResult = result;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0]; // Select first available camera by default
    }
  }

  onDeviceSelect() {
    if (this.selectedDevice && this.selectedDevice.kind === 'videoinput') {
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: this.selectedDevice.deviceId } })
        .then((stream) => {
          const track = stream.getVideoTracks()[0];
          this.hasTorch = 'torch' in track.getCapabilities();
        });
    }
  }

  toggleTorch() {
    this.torchEnabled = !this.torchEnabled;
  }
}
