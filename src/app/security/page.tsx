import React from 'react'
import { Shield } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-heading">Trust & Security</h1>
      </div>
      <div className="prose prose-lg text-body max-w-none">
        <p>Security is not an afterthought at OneAtlas; it is foundational to our architecture. All generated applications benefit automatically from our enterprise-grade security posture.</p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-secondary p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-heading mb-3">Data Encryption</h3>
            <p className="text-sm">All data is encrypted at rest using AES-256 and in transit via TLS 1.3.</p>
          </div>
          <div className="bg-secondary p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-heading mb-3">Access Control</h3>
            <p className="text-sm">Built-in Role-Based Access Control (RBAC) ensures users only see what they should.</p>
          </div>
          <div className="bg-secondary p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-heading mb-3">Compliance</h3>
            <p className="text-sm">Our infrastructure aligns with SOC 2 Type II requirements and GDPR standards.</p>
          </div>
          <div className="bg-secondary p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-heading mb-3">Vulnerability Management</h3>
            <p className="text-sm">Continuous automated scanning and third-party penetration testing.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
