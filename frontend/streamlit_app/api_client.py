"""
API Client Module

Handles all HTTP communication with the backend services.
Provides a single interface for all backend API calls.
"""

import requests
import streamlit as st
from typing import Optional, Dict, Any, List
from urllib.parse import urljoin


class APIClient:
    """Client for backend API communication."""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        """
        Initialize API client.
        
        Args:
            base_url: Backend API base URL
        """
        self.base_url = base_url
        self.timeout = 30
    
    def _make_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        files: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Make HTTP request to backend.
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint path
            data: Request body data
            files: Files to upload
            
        Returns:
            Response JSON data
        """
        url = urljoin(self.base_url, endpoint)
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, timeout=self.timeout)
            elif method.upper() == "POST":
                response = requests.post(
                    url,
                    json=data,
                    files=files,
                    timeout=self.timeout
                )
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            response.raise_for_status()
            return response.json()
        
        except requests.exceptions.RequestException as e:
            st.error(f"API Error: {str(e)}")
            return {"error": str(e)}
    
    # ── Content Generation ──────────────────────────────────────────
    
    def generate_content(
        self,
        output_type: str,
        domain: str,
        user_prompt: str,
        division: Optional[str] = None,
        file_type: Optional[str] = None,
        compliance_frameworks: Optional[List[str]] = None,
        style_template: Optional[str] = None,
        uploaded_files: Optional[List[Any]] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Generate content via backend.
        
        Args:
            output_type: Type of output (Presentation, SOP, etc.)
            domain: Business domain
            user_prompt: User's generation prompt
            division: Tata Steel division
            file_type: Preferred output file type
            compliance_frameworks: List of compliance frameworks to apply
            style_template: Style template name or path
            uploaded_files: Files to process
            context: Additional context
            
        Returns:
            Generated content response
        """
        payload = {
            "output_type": output_type,
            "domain": domain,
            "division": division,
            "file_type": file_type,
            "prompt": user_prompt,
            "compliance_frameworks": compliance_frameworks or [],
            "style_template": style_template,
            "context": context or {}
        }
        
        return self._make_request("POST", "/api/generate", data=payload)
    
    def refine_content(
        self,
        asset_id: str,
        improvement_request: str,
        improvements: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Refine generated content.
        
        Args:
            asset_id: ID of asset to refine
            improvement_request: User's refinement request
            improvements: List of applied improvements
            
        Returns:
            Refined content response
        """
        payload = {
            "asset_id": asset_id,
            "improvement_request": improvement_request,
            "improvements": improvements or []
        }
        
        return self._make_request("POST", "/api/refine", data=payload)
    
    # ── Export Operations ───────────────────────────────────────────
    
    def export_asset(
        self,
        asset_id: str,
        format_type: str,
        asset_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Export asset in specified format.
        
        Args:
            asset_id: ID of asset to export
            format_type: Export format (pdf, docx, xlsx, etc.)
            asset_data: Asset content data
            
        Returns:
            Export response with file data
        """
        payload = {
            "asset_id": asset_id,
            "format": format_type,
            "data": asset_data
        }
        
        return self._make_request("POST", "/api/export", data=payload)
    
    # ── Ingestion Operations ────────────────────────────────────────
    
    def ingest_document(self, file_path: str) -> Dict[str, Any]:
        """
        Ingest and analyze document.
        
        Args:
            file_path: Path to document file
            
        Returns:
            Ingestion analysis response
        """
        with open(file_path, 'rb') as f:
            files = {"file": f}
            return self._make_request("POST", "/api/ingest", files=files)
    
    # ── Health Check ────────────────────────────────────────────────
    
    def health_check(self) -> bool:
        """Check if backend is available."""
        try:
            response = self._make_request("GET", "/api/health")
            return response.get("status") == "ok"
        except Exception:
            return False


# Global API client instance
@st.cache_resource
def get_api_client() -> APIClient:
    """Get or create API client instance."""
    return APIClient()
